// post-category.model.ts (để định nghĩa bảng nối)
import Category from "@src/app/categories/entities/category.entity";
import Post from "@src/app/posts/entities/post.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_post_categories" })
export class PostCategory extends BaseModelSequelize<PostCategory> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "post_id" })
    @ForeignKey(() => Post)
    postId: number;

    @Column({ field: "category_id" })
    @ForeignKey(() => Category)
    categoryId: number;

    @BelongsTo(() => Post, "post_id")
    post: Post;

    @BelongsTo(() => Category, "category_id")
    category: Category;
}
