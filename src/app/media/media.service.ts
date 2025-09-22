import {
    CopyObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MediaFilter, PreSignedUrlDto, UploadImageDto } from "@src/app/media/dto/media.dto";
import Media from "@src/app/media/entities/media.entity";
import { MediaRepository } from "@src/app/media/media.repository";
import { BaseResponse, BaseService } from "@src/base";
import { MediaQualityEnum, MediaSizeEnum, MediaSizeNameEnum, STORAGE_PATH } from "@src/config";
import { S3ImageDto } from "@src/ecom/import-product/dto/s3-image.dto";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import * as fs from "fs";
import * as mime from "mime-types";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import * as sharp from "sharp";
import * as uuid from "uuid";
// const AWS = require("aws-sdk");

@Injectable()
export class MediaService extends BaseService<Media, MediaRepository> {
    private storegeS3;

    constructor(
        @Inject(MediaRepository)
        private readonly mediaRepo: MediaRepository,
        private sequelize: Sequelize,
        private configService: ConfigService
    ) {
        super(mediaRepo);
        // Cấu hình AWS SDK
        this.storegeS3 = new S3Client({
            region: this.configService.get("AWS_REGION"),
            credentials: {
                accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            },
        });
    }

    async processSingleImage(file) {
        const imageBuffer = fs.readFileSync(file.path);

        if (file.mimetype === "image/svg+xml") {
            // Nếu là ảnh SVG, lưu nó mà không xử lý
            fs.writeFileSync(`./uploads/${file.filename}.svg`, imageBuffer);
        } else {
            // Xử lý kích thước và chất lượng ảnh
            const resizedImageBuffer = await sharp(imageBuffer)
                .resize({ width: 300, height: 300 }) // Thay đổi kích thước ảnh theo nhu cầu của bạn
                .jpeg({ quality: 80 });

            // Lưu các tệp ảnh đã xử lý vào thư mục cụ thể
            fs.writeFileSync(`./uploads/${file.filename}-small.jpg`, await resizedImageBuffer.toBuffer());
        }
        // Trả về thông tin về các tệp đã tạo
        return {
            originalFilename: file.originalname,
            smallImageFilename: `${file.filename}-small.jpg`,
            x: file,
        };
    }

    async processImage(files: Express.Multer.File[], request: UploadImageDto, userId: number) {
        try {
            const { slug = "", mediaType, type, mediaAbleType, targetId } = request;
            const newUUID = uuid.v4();
            const imageResults = [];
            if (!Array.isArray(files)) {
                // Kiểm tra xem `files` có phải là một mảng không
                throw new Error("Invalid files format");
            }
            for (const file of files) {
                const imageBuffer = fs.readFileSync(file.path);
                const imageType = mime.extension(file.mimetype);
                const smallName = `${slug}-${newUUID}-${MediaSizeNameEnum.SMALL}.${imageType}`;
                const mediumName = `${slug}-${newUUID}-${MediaSizeNameEnum.MEDIUM}.${imageType}`;
                const fullName = `${slug}-${newUUID}.${imageType}`;

                const img = await this.mediaRepo.create({
                    name: fullName,
                    mediaType: mediaType,
                    type: type,
                    code: newUUID,
                    mediaableType: mediaAbleType,
                    mimeType: file.mimetype,
                    ...insertIfObject(!!targetId, { mediaableId: targetId }),
                    ...insertIfObject(!!userId, { userId }),
                });

                if (file.mimetype === "image/svg+xml") {
                    // Nếu là ảnh SVG, lưu nó mà không xử lý
                    fs.writeFileSync(`./${STORAGE_PATH}/${fullName}`, imageBuffer);
                } else {
                    // Xử lý kích thước và chất lượng ảnh cho các loại khác
                    const smallImageBuffer = await sharp(imageBuffer)
                        .resize({ width: MediaSizeEnum.SMALL })
                        .jpeg({ quality: MediaQualityEnum.MEDIUM })
                        .toBuffer();
                    const mediumImageBuffer = await sharp(imageBuffer)
                        .resize({ width: MediaSizeEnum.MEDIUM })
                        .jpeg({ quality: MediaQualityEnum.MEDIUM })
                        .toBuffer();
                    const fullImageBuffer = await sharp(imageBuffer)
                        .jpeg({ quality: MediaQualityEnum.MEDIUM })
                        .toBuffer();

                    fs.writeFileSync(`./${STORAGE_PATH}/${smallName}`, smallImageBuffer);
                    fs.writeFileSync(`./${STORAGE_PATH}/${mediumName}`, mediumImageBuffer);
                    fs.writeFileSync(`./${STORAGE_PATH}/${fullName}`, fullImageBuffer);
                }

                imageResults.push(img);

                // Xóa tệp tạm sau khi xử lý thành công
                fs.unlinkSync(file.path);
            }
            // Trả về thông tin về các tệp đã tạo
            return imageResults;
        } catch (e) {
            for (const file of files) {
                fs.unlinkSync(file.path);
            }
        }
    }

    async uploadToS3(buffer: Buffer, key: string, mimetype: string): Promise<string> {
        const region = this.configService.get("AWS_REGION");
        const bucket = this.configService.get("S3_BUCKET_NAME");
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: mimetype,
        });

        await this.storegeS3.send(command);
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    }

    async coppyToOtherBucket({
        toBucketName,
        fromBucketName,
        fileKey,
    }: {
        toBucketName: string;
        fromBucketName: string;
        fileKey: string;
    }) {
        const copyCommand = new CopyObjectCommand({
            Bucket: toBucketName,
            CopySource: `${fromBucketName}/${fileKey}`,
            Key: fileKey,
        });
        const region = this.configService.get("AWS_REGION");

        await this.storegeS3.send(copyCommand);

        return `https://${toBucketName}.s3.${region}.amazonaws.com/${fileKey}`;
    }

    async deleteFileInBucket({ bucketName, fileKey }: { bucketName: string; fileKey: string }) {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
        });

        await this.storegeS3.send(deleteCommand);
        return true;
    }

    async getImagesFromS3ByBucketName(bucketName: string): Promise<S3ImageDto[]> {
        try {
            const command = new ListObjectsV2Command({
                Bucket: bucketName,
            });

            const response = await this.storegeS3.send(command);

            if (!response.Contents) {
                return [];
            }

            return response.Contents.map((file: S3ImageDto) => file);
        } catch (error) {
            throw new Error(`❌ Error get images from s3: ${error.message}`);
        }
    }

    async processImageS3(files: Express.Multer.File[], request: UploadImageDto, userId: number) {
        try {
            const { slug = "", mediaType, type, mediaAbleType, targetId, collectionId } = request;
            const newUUID = uuid.v4();
            const imageResults = [];
            if (!Array.isArray(files)) {
                // Kiểm tra xem `files` có phải là một mảng không
                throw new Error("Invalid files format");
            }
            for (const file of files) {
                const imageBuffer = fs.readFileSync(file.path);
                const imageType = mime.extension(file.mimetype);
                const smallName = `${slug}-${newUUID}-${MediaSizeNameEnum.SMALL}.${imageType}`;
                const mediumName = `${slug}-${newUUID}-${MediaSizeNameEnum.MEDIUM}.${imageType}`;
                const fullName = `${slug}-${newUUID}.${imageType}`;
                let url;

                if (file.mimetype === "image/svg+xml") {
                    // Nếu là ảnh SVG, lưu nó mà không xử lý
                    url = await this.uploadToS3(imageBuffer, fullName, file.mimetype);
                } else {
                    // Xử lý kích thước và chất lượng ảnh cho các loại khác
                    // const smallImageBuffer = await sharp(imageBuffer)
                    //     .resize({ width: MediaSizeEnum.SMALL })
                    //     .jpeg({ quality: MediaQualityEnum.MEDIUM })
                    //     .toBuffer();
                    // const mediumImageBuffer = await sharp(imageBuffer)
                    //     .resize({ width: MediaSizeEnum.MEDIUM })
                    //     .jpeg({ quality: MediaQualityEnum.MEDIUM })
                    //     .toBuffer();
                    const fullImageBuffer = await sharp(imageBuffer)
                        .jpeg({ quality: MediaQualityEnum.MEDIUM })
                        .toBuffer();

                    // await this.uploadToS3(smallImageBuffer, smallName, file.mimetype);
                    // await this.uploadToS3(mediumImageBuffer, mediumName, file.mimetype);
                    url = await this.uploadToS3(fullImageBuffer, fullName, file.mimetype);
                }
                const img = await this.mediaRepo.create({
                    collectionId: collectionId,
                    name: fullName,
                    mediaType: mediaType,
                    type: type,
                    code: newUUID,
                    mediaableType: mediaAbleType,
                    mimeType: file.mimetype,
                    ...insertIfObject(!!targetId, { mediaableId: targetId }),
                    ...insertIfObject(!!userId, { userId }),
                    url,
                });

                imageResults.push(img);

                // Xóa tệp tạm sau khi xử lý thành công
                fs.unlinkSync(file.path);
            }
            // Trả về thông tin về các tệp đã tạo
            return imageResults;
        } catch (e) {
            for (const file of files) {
                fs.unlinkSync(file.path);
            }
            return e;
        }
    }

    async findAll(filter: MediaFilter): Promise<BaseResponse<Media[]>> {
        const media = await this.mediaRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                type: filter?.type,
                ...insertIfObject(filter?.collectionId && Number(filter?.collectionId) !== 0, {
                    collectionId: filter?.collectionId,
                }),
                ...insertIfObject(Number(filter?.collectionId) === 0, {
                    collectionId: { [Op.eq]: null },
                }),
            },
        });

        const count = await this.mediaRepo.count({
            where: {
                ...filter?.where,
                type: filter?.type,
                ...insertIfObject(filter?.collectionId && Number(filter?.collectionId) !== 0, {
                    collectionId: filter?.collectionId,
                }),
                ...insertIfObject(Number(filter?.collectionId) === 0, {
                    collectionId: { [Op.eq]: null },
                }),
            },
        });
        console.log(convertFilterWithOrderBy(filter), count);

        return {
            data: media,
            count,
        };
    }

    async generatePreSignedUrl(requests: PreSignedUrlDto[], userId: number) {
        const region = this.configService.get("AWS_REGION");
        const bucket = this.configService.get("S3_BUCKET_NAME");
        const imageResults = [];
        for (const request of requests) {
            const { slug = "", mediaType, type, mediaAbleType, targetId, mimeType, collectionId } = request;
            const newUUID = uuid.v4();
            const fileName = `${request?.slug}-${newUUID}.${mimeType.split("/")[1]}`; // tạo tên file ngẫu nhiên với uuid

            const command = new PutObjectCommand({
                Bucket: this.configService.get("S3_BUCKET_NAME"),
                Key: fileName,
                ContentType: mimeType,
                // ACL: "public-read", // quyền truy cập
            });

            try {
                const url = await getSignedUrl(this.storegeS3, command, { expiresIn: 180 });
                const img = await this.mediaRepo.create({
                    collectionId: collectionId,
                    name: fileName,
                    mediaType: mediaType,
                    type: type,
                    code: newUUID,
                    mediaableType: mediaAbleType,
                    mimeType: mimeType,
                    ...insertIfObject(!!targetId, { mediaableId: targetId }),
                    ...insertIfObject(!!userId, { userId }),
                    url: `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`,
                });
                imageResults.push({ url, fileName, img });
            } catch (e) {}
        }
        return imageResults;
    }
}
