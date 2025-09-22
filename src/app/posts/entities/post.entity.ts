import Category from "@src/app/categories/entities/category.entity";
import Media from "@src/app/media/entities/media.entity";
import { PostCategory } from "@src/app/post-category/entities/post-category.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { ContactTypeEnum, MediaAbleTypeEnum, PostTypeEnum } from "@src/config";
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "wf_posts" })
export class Post extends BaseModelSequelize<Post> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "status", type: DataType.BOOLEAN })
    status: boolean;

    @Column({ field: "title", type: DataType.STRING })
    title: string;

    @Column({ field: "slug", type: DataType.TEXT, unique: true })
    slug: string;

    @Column({ field: "thumbnail", type: DataType.TEXT })
    thumbnail: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "content", type: DataType.TEXT })
    content: string;

    @Column({ field: "post_type", type: DataType.TEXT })
    postType: PostTypeEnum;

    @Column({ field: "tags", type: DataType.TEXT })
    tags: string;

    @Column({ field: "video", type: DataType.TEXT })
    video: string;

    @Column({ field: "priority", type: DataType.FLOAT })
    priority: number;

    @Column({ field: "seo_title", type: DataType.TEXT })
    seoTitle: string;

    @Column({ field: "seo_description", type: DataType.TEXT })
    seoDescription: string;

    @Column({ field: "seo_keyword", type: DataType.TEXT })
    seoKeyword: string;

    @Column({ field: "seo_location", type: DataType.TEXT })
    seoLocation: string;

    @Column({ field: "view", type: DataType.INTEGER, defaultValue: 0 })
    view: number;

    @Column({ field: "phone", type: DataType.TEXT })
    phone: string;

    @Column({ field: "email", type: DataType.TEXT })
    email: string;

    @Column({ field: "contact_type", type: DataType.TEXT })
    contactType: ContactTypeEnum;

    @Column({ field: "subcribe_date", type: DataType.TEXT })
    subcribeDate: string;

    @BelongsTo(() => User, "user_id")
    user: User;

    // @BelongsToMany(() => Category, {
    //     through: "wf_post_categories",
    //     as: "categories",
    //     foreignKey: "post_id",
    //     otherKey: "category_id",
    // })
    // categories: Category[];

    @BelongsToMany(() => Category, () => PostCategory)
    categories: Category[];

    @HasMany(() => Media, {
        foreignKey: "mediaable_id",
        constraints: false,
        scope: {
            mediaable_type: MediaAbleTypeEnum.POST,
        },
    })
    media: Media[];
}

// Autoload Model
export default Post;
