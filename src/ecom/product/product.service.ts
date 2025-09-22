import { Inject, Injectable } from "@nestjs/common";
import { MediaRepository } from "@src/app/media/media.repository";
import User from "@src/app/users/entities/user.entity";
import { BaseResponse, BaseService } from "@src/base";
import { MediaAbleTypeEnum } from "@src/config";
import Color from "@src/ecom/color/entities/color.entity";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { ProductGallery } from "@src/ecom/product-gallery/entities/product-gallery.entity";
import { ProductGalleryRepository } from "@src/ecom/product-gallery/product-gallery.repository";
import { CreateProductDto } from "@src/ecom/product/dto/create-product.dto";
import { FilterProductDto } from "@src/ecom/product/dto/product.dto";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import Size from "@src/ecom/size/entities/size.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere, generateProductCode, insertIfObject } from "@src/utils";
import { omit } from "lodash";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
    constructor(
        @Inject(ProductRepository)
        private readonly productRepository: ProductRepository,
        private sequelize: Sequelize,
        @Inject(MediaRepository)
        private readonly mediaRepository: MediaRepository,
        @Inject(ProductGalleryRepository)
        private readonly productGalleryRepository: ProductGalleryRepository
    ) {
        super(productRepository);
    }

    async create(createPostDto: CreateProductDto) {
        try {
            console.log(createPostDto);

            const product = await this.sequelize.transaction(async (t) => {
                const product = await this.productRepository.create({
                    ...omit(createPostDto, ["mediaId", "categoryIds", "colorIds", "galleries"]),
                    productCode: createPostDto?.productCode ?? generateProductCode() ?? "",
                    userId: Number(createPostDto.userId),
                });

                if (createPostDto?.categoryIds && createPostDto?.categoryIds.length > 0) {
                    await product.$set("ecomCategories", createPostDto?.categoryIds ?? []);
                }

                // if (createPostDto?.userId) {
                //     await product.$set("user", createPostDto?.userId);
                // }

                // add avatar
                if (product && createPostDto?.mediaId) {
                    this.mediaRepository.updateById(createPostDto.mediaId, {
                        mediaableId: product.id,
                        mediaableType: MediaAbleTypeEnum.ECOM_PRODUCT,
                    });
                }

                // add color
                if (createPostDto?.colorIds) {
                    await product.$set("colors", createPostDto?.colorIds);
                }

                // add size
                if (createPostDto?.sizeIds) {
                    await product.$set("sizes", createPostDto?.sizeIds);
                }

                // add gallery with color
                if (product && createPostDto?.galleries) {
                    const galleries = [];
                    for (let gallery of createPostDto?.galleries) {
                        galleries.push(this.productGalleryRepository.create({ ...gallery, productId: product.id }));
                    }
                    await Promise.all(galleries);
                }
                return product;
            });
            return await this.findOne(product.id);
        } catch (err) {
            throw err;
            // throw new Error(err);
        }
    }

    async findAll(filter?: FilterProductDto): Promise<BaseResponse<Product[]>> {
        const products = await this.productRepository.find({
            ...{ order: [["createdAt", "DESC"]] },
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
                ...insertIfObject(filter?.search, {
                    [Op.or]: [
                        { productName: { [Op.like]: `%${filter?.search}%` } },
                        { description: { [Op.like]: `%${filter?.search}%` } },
                        { slug: { [Op.like]: `%${filter?.search}%` } },
                        { tags: { [Op.like]: `%${filter?.search}%` } },
                    ],
                }),
                ...insertIfObject(filter?.minPrice || filter?.maxPrice, {
                    [Op.and]: [
                        { ...insertIfObject(filter?.minPrice, { showPrice: { [Op.gte]: filter?.minPrice } }) },
                        { ...insertIfObject(filter?.maxPrice, { showPrice: { [Op.lte]: filter?.maxPrice } }) },
                    ],
                }),
                ...insertIfObject(filter?.brandName, {
                    brandName: filter.brandName,
                }),
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                {
                    model: EcomCategory,
                    ...insertIfObject(filter?.categoryId, { required: true, where: { id: filter?.categoryId } }),
                },
                {
                    model: Color,
                    ...insertIfObject(filter?.colorIds, {
                        required: true,
                        where: { id: { [Op.in]: filter?.colorIds ?? [] } },
                    }),
                },
                {
                    model: Size,
                    ...insertIfObject(filter?.sizeIds, {
                        as: "sizes",
                        required: true,
                        where: { id: { [Op.in]: filter?.sizeIds ?? [] } },
                    }),
                },
                "media",
                "galleries",
            ],
        });
        const count = await this.productRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
                ...insertIfObject(filter?.search, {
                    [Op.or]: [
                        { productName: { [Op.like]: `%${filter?.search}%` } },
                        { description: { [Op.like]: `%${filter?.search}%` } },
                        { slug: { [Op.like]: `%${filter?.search}%` } },
                        { tags: { [Op.like]: `%${filter?.search}%` } },
                    ],
                }),
                ...insertIfObject(filter?.minPrice || filter?.maxPrice, {
                    [Op.and]: [
                        { ...insertIfObject(filter?.minPrice, { showPrice: { [Op.gte]: filter?.minPrice } }) },
                        { ...insertIfObject(filter?.maxPrice, { showPrice: { [Op.lte]: filter?.maxPrice } }) },
                    ],
                }),
                ...insertIfObject(filter?.brandName, {
                    brandName: filter.brandName,
                }),
            },
            include: [
                // { model: User, attributes: ["id", "email", "username"] },
                ...(insertIfObject(
                    filter?.categoryId,
                    [
                        {
                            model: EcomCategory,
                            required: true,
                            where: { id: filter?.categoryId },
                        },
                    ],
                    []
                ) as []),
                ...(insertIfObject(
                    filter?.colorIds,
                    [
                        {
                            model: Color,
                            as: "colors",
                            required: true,
                            where: { id: { [Op.in]: filter?.colorIds ?? [] } },
                        },
                    ],
                    []
                ) as []),
                ...(insertIfObject(
                    filter?.sizeIds,
                    [
                        {
                            model: Size,
                            as: "sizes",
                            required: true,
                            where: { id: { [Op.in]: filter?.sizeIds ?? [] } },
                        },
                    ],
                    []
                ) as []),
            ],
        });
        return {
            count,
            data: products,
        };
    }

    async findOne(id: number) {
        return this.productRepository.findOne({
            where: { id },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                // { model: EcomCategory },
                "media",
                "ecomCategories",
                "colors",
                "sizes",
                "galleries",
            ],
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const res = await this.sequelize.transaction(async (t) => {
            await this.productRepository.updateByIdWithBase(id, {
                ...omit(updateProductDto, ["mediaId", "categoryIds", "colorIds", "galleries"]),
            });
            const product = await this.productRepository.findById(id, {
                include: [{ model: ProductGallery, as: "galleries" }],
            });
            await product.$set("ecomCategories", updateProductDto?.categoryIds ?? []);
            if (updateProductDto?.categoryIds && updateProductDto?.categoryIds.length > 0) {
                await product.$set("ecomCategories", updateProductDto?.categoryIds ?? []);
            }

            // update avatar
            if (product && updateProductDto?.mediaId) {
                this.mediaRepository.updateById(updateProductDto.mediaId, {
                    mediaableId: product.id,
                    mediaableType: MediaAbleTypeEnum.ECOM_PRODUCT,
                });
            }

            // update color
            if (updateProductDto?.colorIds) {
                await product.$set("colors", updateProductDto?.colorIds);
            }

            // update size
            if (updateProductDto?.sizeIds) {
                await product.$set("sizes", updateProductDto?.sizeIds);
            }

            if (updateProductDto?.deleteCategoryIds) {
                await product.$remove("ecomCategories", updateProductDto?.deleteCategoryIds);
            }

            // check exists media with new URL
            if (updateProductDto?.galleries) {
                await product.$remove("ecomCategories", updateProductDto?.deleteCategoryIds);
                const updatedMedias = await Promise.all(
                    updateProductDto?.galleries.map(async (item) => {
                        // check exists media
                        const existingMedia = product.galleries.find(
                            (gallery) =>
                                gallery.url === item.url &&
                                gallery.colorId == item.colorId &&
                                gallery.code === item.code
                        );

                        if (existingMedia) {
                            return existingMedia;
                        }

                        const existingMediaByColorId = product.galleries.find(
                            (gallery) => gallery.code === item.code && gallery.colorId == item.colorId
                        );

                        if (existingMediaByColorId) {
                            this.productGalleryRepository.forceDelete(existingMediaByColorId.id);
                            this.mediaRepository.delete(item.mediaId);
                            return this.productGalleryRepository.create({ ...item, productId: product.id });
                        }
                        // if media not exists, create media
                        return this.productGalleryRepository.create({ ...item, productId: product.id });
                    })
                );
            }

            return product;
        });
        return this.findOne(res.id);
    }

    remove(id: number) {
        return this.delete(id);
    }
}
