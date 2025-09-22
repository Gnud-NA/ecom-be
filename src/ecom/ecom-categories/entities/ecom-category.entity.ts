import Media from "@src/app/media/entities/media.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { DomainEnum, MediaAbleTypeEnum } from "@src/config";
import { ProductCategory } from "@src/ecom/product-category/entities/product-category.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_categories" })
export class EcomCategory extends BaseModelSequelize<EcomCategory> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING(256) })
    name: string;

    @Column({ field: "brand_name", type: DataType.STRING(256), defaultValue: DomainEnum.REMEMBER_NGUYEN })
    brandName: DomainEnum;

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

    @ForeignKey(() => EcomCategory)
    @Column({ field: "parent_id", type: DataType.INTEGER })
    parentId: number;

    @Column({ field: "priority", type: DataType.INTEGER })
    priority: number;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => EcomCategory, "parent_id")
    parent: EcomCategory;

    @HasMany(() => EcomCategory)
    childs: EcomCategory[];

    // @HasMany(() => PostCategory)
    // postCategories: PostCategory[];

    // @BelongsToMany(() => Post, () => PostCategory)
    // categories: Post[];
    @BelongsToMany(() => Product, {
        through: () => ProductCategory, //"ecom_product_categories",
        as: "products",
        foreignKey: "ecom_category_id",
        otherKey: "ecom_product_id",
    })
    products: Product[];

    @HasMany(() => Media, {
        foreignKey: "mediaable_id",
        constraints: false,
        scope: {
            mediaable_type: MediaAbleTypeEnum.ECOM_CATEGORY,
        },
    })
    media: Media[];
}

// Autoload Model
export default EcomCategory;
