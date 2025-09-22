import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import { MediaRepository } from "@src/app/media/media.repository";
import { MediaService } from "@src/app/media/media.service";
import { PostTypeEnum } from "@src/config";
import { CSVProductDto, CSVProductMapingedDto } from "@src/ecom/import-product/dto/csv-product-dto";
import { ProductGalleryRepository } from "@src/ecom/product-gallery/product-gallery.repository";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { SizeRepository } from "@src/ecom/size/size.repository";
import { changeToSlug } from "@src/utils";
import { Queue } from "bull";
import * as csv from "csv-parser";
import { isArray, isNilOrEmpty, isNotNil, isNotNilOrEmpty, isNumber } from "ramda-adjunct";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import { ColorRepository } from "./../color/color.repository";
import { S3ImageDto } from "./dto/s3-image.dto";
@Injectable()
export class ImportProductService {
    private readonly mainBucketName: string;
    private readonly tmpProductImageImportBucketName: string;
    private readonly defaultCategoryWfCode = "REMEMBER_NEW_ARRIVALS";

    constructor(
        @InjectQueue("import-product") private importProductQueue: Queue,
        private productRepository: ProductRepository,
        private mediaService: MediaService,
        private configService: ConfigService,
        private productGalleryRepository: ProductGalleryRepository,
        private sizeRepository: SizeRepository,
        private categoryRepository: CategoryRepository,
        private colorRepository: ColorRepository,
        private mediaRepository: MediaRepository
    ) {
        this.mainBucketName = configService.get("S3_BUCKET_NAME");
        this.tmpProductImageImportBucketName = configService.get("S3_BUCKET_TMP_PRODUCT_IMAGE_IMPORT_NAME");
    }

    async importCSV({
        file,
        userId = 1,
        brandName,
    }: {
        file: Express.Multer.File;
        userId?: number;
        brandName: string;
    }) {
        try {
            // await this.importProductQueue.obliterate({ force: true });
            // return this.importProductQueue.getJobCounts();
            const stream = Readable.from(file.buffer);
            const data = new Promise((resolve, reject) => {
                const results = [];
                stream
                    .pipe(csv())
                    .on("data", (data) => results.push(data))
                    .on("end", () => resolve(results))
                    .on("error", (error) => {
                        throw new Error("Error reading CSV file: " + error);
                    });
            });

            const productArray: CSVProductDto[] = (await data) as CSVProductDto[];

            if (isNilOrEmpty(productArray)) {
                throw new Error("CSV file is empty");
            }

            const images: S3ImageDto[] = await this.mediaService.getImagesFromS3ByBucketName(
                this.tmpProductImageImportBucketName
            );
            // return images;

            const mappingProducts: CSVProductMapingedDto = this.mappinngProducts(productArray);
            // chunk mappingProducts and add to queue
            const chunkSize = 100;
            const chunks = [];
            for (let i = 0; i < Object.keys(mappingProducts).length; i += chunkSize) {
                chunks.push(Object.keys(mappingProducts).slice(i, i + chunkSize));
            }

            for (const chunk of chunks) {
                return await this.importProductQueue.add(
                    "import-product",
                    {
                        mappingProducts: mappingProducts,
                        chunk,
                        userId,
                        brandName,
                    },
                    {
                        attempts: 3,
                        backoff: {
                            type: "exponential",
                            delay: 1000,
                        },
                    }
                );
            }
        } catch (error) {
            console.log("error ---->:", error);
        }
    }

    public async handleImportProduct({
        mappingProducts,
        chunk,
        userId,
        brandName,
    }: {
        mappingProducts: CSVProductMapingedDto;
        chunk: string[];
        userId: number;
        brandName: string;
    }) {
        try {
            const images: S3ImageDto[] = await this.mediaService.getImagesFromS3ByBucketName(
                this.tmpProductImageImportBucketName
            );
            for (const productCode of chunk) {
                if (isNilOrEmpty(mappingProducts?.[productCode]?.showPrice)) {
                    continue;
                }
                const productName =
                    mappingProducts?.[productCode]?.productName ?? mappingProducts?.[productCode]?.title;

                const product = await this.productRepository.findOne({
                    where: {
                        productCode: productCode,
                    },
                });

                if (isNotNil(product)) {
                    // handle product already exists
                    continue;
                }

                const newProduct = {
                    productName: productName,
                    stockQuantity: mappingProducts[productCode]?.quantity,
                    basePrice: mappingProducts[productCode]?.basePrice,
                    showPrice: mappingProducts[productCode]?.showPrice,
                    slug: changeToSlug(productCode + " " + productName),
                    productCode: productCode,
                    description: mappingProducts[productCode]?.productDescription,
                    content: mappingProducts[productCode]?.productDescription,
                    image: "",
                    userId,
                    status: false,
                    brandName,
                };

                const productCreated = await this.productRepository.create(newProduct);
                const productJsonCreated = productCreated.toJSON();

                let avatarUrl = "";
                const galleryIds = [];
                let hasAvatar = false; // Track if avatar has been processed

                const productImages = this.getImagesForProduct({
                    productCode,
                    images,
                });

                const colorCodes = Object.keys(productImages);
                console.log("colorCodes ---->:", colorCodes, productImages);
                const colorIds = [];
                if (colorCodes.length > 0) {
                    for (const colorCode of colorCodes) {
                        const colorNames = Object.keys(productImages[colorCode]);
                        const colorCodeRandom = uuidv4();

                        if (isNotNilOrEmpty(colorNames)) {
                            for (let i = 0; i < colorNames.length; i++) {
                                const colorName = colorNames[i];
                                const productImageArray: S3ImageDto[] = productImages[colorCode]?.[colorName];

                                for (const productImage of productImageArray) {
                                    const parsedImage = this.paserImageName(productImage?.Key);

                                    const colorDb = await this.colorRepository.findOne({
                                        where: {
                                            name: colorName,
                                        },
                                    });
                                    let colorId = 0;
                                    if (isNotNil(colorDb)) {
                                        colorId = colorDb?.id;
                                        if (!colorIds.includes(colorId)) {
                                            colorIds.push(colorId);
                                        }
                                    } else {
                                        const newColor = await this.colorRepository.create({
                                            name: colorName,
                                            hexCode: "",
                                        });
                                        colorId = newColor.toJSON()?.id;
                                        if (!colorIds.includes(colorId)) {
                                            colorIds.push(colorId);
                                        }
                                    }

                                    // Update the field

                                    await productCreated.save();

                                    const imageUrl = await this.mediaService.coppyToOtherBucket({
                                        toBucketName: this.mainBucketName,
                                        fromBucketName: this.tmpProductImageImportBucketName,
                                        fileKey: productImage?.Key,
                                    });

                                    await this.mediaService.deleteFileInBucket({
                                        bucketName: this.tmpProductImageImportBucketName,
                                        fileKey: productImage?.Key,
                                    });

                                    const newMedia = await this.mediaRepository.create({
                                        url: imageUrl,
                                        productId: productCreated.id,
                                        name: productImage?.Key,
                                        userId: userId,
                                    });

                                    if (parsedImage?.isAvatar) {
                                        avatarUrl = imageUrl;
                                        hasAvatar = true;
                                    }

                                    if (!avatarUrl && i === 0) {
                                        avatarUrl = imageUrl;
                                        hasAvatar = true;
                                    }

                                    const newGallery = await this.productGalleryRepository.create({
                                        colorId: colorId,
                                        mediaId: newMedia.toJSON()?.id,
                                        code: colorCodeRandom,
                                        productId: productJsonCreated.id,
                                        url: imageUrl,
                                    });

                                    galleryIds.push(newGallery.toJSON()?.id);
                                }
                            }
                        }
                    }
                }

                productCreated.$set("colors", colorIds);
                await productCreated.save();

                //add avatar for product

                const avatar = this.getAvatarForProduct({
                    productCode,
                    images,
                });

                if (isNotNil(avatar)) {
                    const imageUrl = await this.mediaService.coppyToOtherBucket({
                        toBucketName: this.mainBucketName,
                        fromBucketName: this.tmpProductImageImportBucketName,
                        fileKey: avatar?.Key,
                    });

                    await this.mediaService.deleteFileInBucket({
                        bucketName: this.tmpProductImageImportBucketName,
                        fileKey: avatar?.Key,
                    });

                    const newMedia = await this.mediaRepository.create({
                        url: imageUrl,
                        productId: productCreated.id,
                        name: avatar?.Key,
                        userId: userId,
                    });
                    await productCreated.update({ image: imageUrl });
                    avatarUrl = imageUrl; // Update avatarUrl after processing
                    hasAvatar = true;
                }
                // add category for product
                let categoryId = 0;
                const categoryDb = await this.categoryRepository.findOne({
                    where: {
                        wfCode: this.defaultCategoryWfCode,
                    },
                });

                if (isNotNil(categoryDb)) {
                    categoryId = categoryDb.id;
                } else {
                    const newCategory = await this.categoryRepository.create({
                        wfCode: this.defaultCategoryWfCode,
                        name: this.defaultCategoryWfCode,
                        description: "",
                        slug: changeToSlug(this.defaultCategoryWfCode),
                        postType: PostTypeEnum.BLOG,
                        icon: "",
                        image: "",
                        userId: userId,
                    });
                    categoryId = newCategory.toJSON()?.id;
                }

                productCreated.$set("ecomCategories", [categoryId]);

                // add sizes for product
                const sizeIds = [];
                if (
                    mappingProducts[productCode]?.sizes &&
                    isArray(mappingProducts[productCode]?.sizes) &&
                    mappingProducts[productCode]?.sizes?.length > 0
                ) {
                    for (const size of mappingProducts[productCode]?.sizes) {
                        const sizeDb = await this.sizeRepository.findOne({
                            where: {
                                name: size.toUpperCase().trim(),
                            },
                        });

                        if (isNotNil(sizeDb)) {
                            sizeIds.push(sizeDb.id);
                            continue;
                        }

                        const newSize = await this.sizeRepository.create({
                            name: size.toUpperCase().trim(),
                            description: "",
                            length: size.toUpperCase().trim(),
                            chest: "", // todo: add chest
                        });
                        sizeIds.push(newSize.toJSON()?.id);
                    }
                    productCreated.$set("sizes", sizeIds);
                }

                if (isNotNilOrEmpty(avatarUrl) && productCreated?.image === "") {
                    await productCreated.update({ image: avatarUrl });
                }

                // Update status based on whether we have an avatar
                if (hasAvatar || isNotNilOrEmpty(avatarUrl)) {
                    await productCreated.update({ status: true });
                }

                if (isNotNilOrEmpty(galleryIds)) {
                    productCreated.$set("galleries", galleryIds);
                }
            }
        } catch (error) {
            console.log("error ---->:", error);
            throw error;
        }
    }

    private mappinngProducts(products: CSVProductDto[]): CSVProductMapingedDto {
        if (isNilOrEmpty(products) || !isArray(products)) {
            return [] as any;
        }
        const result: any = {};
        for (const product of products) {
            const productPasered: any = this.paserProduct(product);
            const productBasePrice = Number(productPasered?.basePrice);
            const productShowPrice = Number(productPasered?.showPrice);

            if (!isNotNilOrEmpty(productPasered?.showPrice)) {
                continue;
            }
            if (productPasered?.quantity === 0) {
                continue;
            }
            if (!result[productPasered?.productCode]) {
                result[productPasered?.productCode] = {};
            }

            if (!result[productPasered?.productCode]?.sizes) {
                result[productPasered?.productCode].sizes = [];
            }

            if (!result[productPasered?.productCode]?.quantity) {
                result[productPasered?.productCode].quantity = 0;
            }

            if (
                isNumber(productBasePrice) &&
                isNumber(productShowPrice) &&
                productBasePrice !== 0 &&
                productShowPrice !== 0
            ) {
                result[productPasered?.productCode].sizes.push(productPasered.size);
                result[productPasered?.productCode].basePrice = Number(productPasered.basePrice);
                result[productPasered?.productCode].showPrice = Number(productPasered.showPrice);
            }

            result[productPasered?.productCode].quantity = productPasered.quantity;
            result[productPasered?.productCode].productName = productPasered.productName ?? productPasered.title;
            result[productPasered?.productCode].productDescription = productPasered.productDescription;
            result[productPasered?.productCode].title = productPasered.title;
        }
        return result;
    }

    private paserProduct(product: CSVProductDto) {
        // Use regex to extract only the last part after the final hyphen as size
        const productSKU = product?.["Product SKU"] || "";
        const lastHyphenIndex = productSKU.lastIndexOf("-");

        // Extract name and size based on the last hyphen position
        const name = lastHyphenIndex !== -1 ? productSKU.substring(0, lastHyphenIndex) : productSKU;
        const size = lastHyphenIndex !== -1 ? productSKU.substring(lastHyphenIndex + 1) : "";

        // console.log("product ---->:", product);

        // Get base price and show price, then clean them with regex to remove $ signs
        const basePrice = product?.["BASE PRICE"] ? product["BASE PRICE"].replace(/[\$-]/g, "").trim() : "";
        const showPrice = product?.["SHOW PRICE"] ? product["SHOW PRICE"].replace(/[\$-]/g, "").trim() : "";

        const result = {
            productName: product?.["TITLE"] ?? product?.["Product Name"] ?? "",
            productCode: name,
            size: size,
            quantity: Number(product?.["Stock Level"]) ?? 0,
            basePrice: basePrice,
            showPrice: showPrice,
            productDescription: product?.["Product Description"] ?? "",
            title: product?.["TITLE"] ?? product?.["Product Name"] ?? "",
        };
        return result;
    }

    getImagesForProduct({ productCode, images }: { productCode: string; images: S3ImageDto[] }) {
        let result: any = {};

        if (!isArray(images) || images.length === 0) {
            return result;
        }

        const imagesForProductArray = images?.filter((image: S3ImageDto) => {
            const imageNameParsed = this.paserImageName(image.Key);
            return imageNameParsed?.productName === productCode;
        });

        for (const image of imagesForProductArray) {
            const imageNameParsed = this.paserImageName(image.Key);
            if (!imageNameParsed?.colorName || !imageNameParsed?.colorCode) {
                continue;
            }
            if (!result[imageNameParsed?.colorCode]) {
                result[imageNameParsed?.colorCode] = {};
            }

            if (!result[imageNameParsed?.colorCode][imageNameParsed?.colorName]) {
                result[imageNameParsed?.colorCode][imageNameParsed?.colorName] = [];
            }

            result[imageNameParsed?.colorCode][imageNameParsed?.colorName].push(image);
        }

        return result;
    }

    private paserImageName(imageName: string): {
        productName: string;
        colorCode: string;
        colorName: string;
        isAvatar: boolean;
    } {
        const imageNameSplited = imageName?.split(".");
        imageNameSplited?.pop(); // remove .(png, .jpg, .jpeg)
        const isAvatar = imageNameSplited?.includes("AVT");
        const colorName = isAvatar ? null : imageNameSplited?.[1]?.split("-")?.[0];
        const colorCode = isAvatar ? null : imageNameSplited?.[1]?.split("-")?.[1];
        const productName = imageNameSplited?.[0];
        const result = {
            productName: productName,
            colorCode,
            colorName,
            isAvatar,
        };
        return result;
    }

    public getAvatarForProduct({ productCode, images }: { productCode: string; images: S3ImageDto[] }) {
        const imagesForProductArray = images?.filter((image: S3ImageDto) => {
            const imageNameParsed = this.paserImageName(image.Key);
            return imageNameParsed?.productName === productCode;
        });

        return imagesForProductArray?.[0];
    }
}
