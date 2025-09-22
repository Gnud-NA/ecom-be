import { PostCategory } from "@src/app/post-category/entities/post-category.entity";
import Post from "@src/app/posts/entities/post.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { PostTypeEnum } from "@src/config";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "wf_categories" })
export class Category extends BaseModelSequelize<Category> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "post_type", type: DataType.TEXT })
    postType: PostTypeEnum;

    @Column({ field: "name", type: DataType.STRING(256) })
    name: string;

    @Column({ field: "slug", type: DataType.STRING(256), unique: true })
    slug: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "content", type: DataType.TEXT })
    content: string;

    @Column({ field: "icon", type: DataType.STRING(256) })
    icon: string;

    @Column({ field: "image", type: DataType.STRING(256) })
    image: string;

    @Column({ field: "wf_code", type: DataType.STRING(256) })
    wfCode: string;

    @Column({ field: "status", type: DataType.BOOLEAN, defaultValue: false })
    status: string;

    @ForeignKey(() => Category)
    @Column({ field: "parent_id", type: DataType.INTEGER })
    parentId: number;

    @Column({ field: "priority", type: DataType.INTEGER })
    priority: number;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => Category, "parent_id")
    parent: Category;

    @HasMany(() => Category)
    childs: Category[];

    @HasMany(() => PostCategory)
    postCategories: PostCategory[];

    // @BelongsToMany(() => Post, () => PostCategory)
    // categories: Post[];
    @BelongsToMany(() => Post, {
        through: "wf_post_categories",
        as: "posts",
        foreignKey: "category_id",
        otherKey: "post_id",
    })
    posts: Post[];
}

// Autoload Model
export default Category;
