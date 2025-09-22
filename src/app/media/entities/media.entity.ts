import Post from "@src/app/posts/entities/post.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { MediaMimeTypeEnum, MediaOrigineEnum, MediaSeviceTypeEnum, MediaTypeEnum } from "@src/config";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_media" })
export class Media extends BaseModelSequelize<Media> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "media_type", type: DataType.TEXT, defaultValue: MediaTypeEnum.IMAGE })
    mediaType: MediaTypeEnum;

    @Column({ field: "name", type: DataType.STRING(256) })
    name: string;

    @Column({
        field: "mime_type",
        type: DataType.ENUM<MediaMimeTypeEnum>(...Object.values(MediaMimeTypeEnum)),
        defaultValue: MediaMimeTypeEnum.JPG,
    })
    mimeType: MediaMimeTypeEnum;

    @Column({ field: "mediaable_type", type: DataType.STRING(256) })
    mediaableType: string;

    @Column({ field: "mediaable_id", type: DataType.BIGINT })
    mediaableId: number;

    @Column({ field: "url", type: DataType.STRING(256), unique: true })
    url: string;

    @Column({ field: "content", type: DataType.TEXT })
    content: string;

    @Column({ field: "type", type: DataType.STRING(256) })
    type: MediaSeviceTypeEnum;

    @Column({ field: "code", type: DataType.STRING(256) })
    code: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @ForeignKey(() => Media)
    @Column({ field: "collection_id", type: DataType.BIGINT })
    collectionId: number;

    @Column({ field: "origin", type: DataType.STRING(256), defaultValue: MediaOrigineEnum.S3 })
    origin: MediaOrigineEnum;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => Post, {
        foreignKey: "mediaable_id",
        constraints: false,
        as: "post",
    })
    post: Post;
}

// Autoload Model
export default Media;
