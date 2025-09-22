import Media from "@src/app/media/entities/media.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { DomainEnum, MediaAbleTypeEnum, ProductDiscountTypeEnum } from "@src/config";
import Color from "@src/ecom/color/entities/color.entity";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import { OrderDetail } from "@src/ecom/order-detail/entities/order-detail.entity";
import { ProductCategory } from "@src/ecom/product-category/entities/product-category.entity";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import { ProductGallery } from "@src/ecom/product-gallery/entities/product-gallery.entity";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Size from "@src/ecom/size/entities/size.entity";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_products" })
export class Product extends BaseModelSequelize<Product> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "slug", type: DataType.TEXT, unique: true })
    slug: string;

    @Column({ field: "product_code", type: DataType.STRING })
    productCode: string;

    @Column({ field: "product_name", type: DataType.STRING })
    productName: string;

    @Column({ field: "brand_name", type: DataType.STRING, defaultValue: DomainEnum.REMEMBER_NGUYEN })
    brandName: DomainEnum;

    @Column({ field: "icon", type: DataType.TEXT })
    icon: string;

    @Column({ field: "image", type: DataType.TEXT })
    image: string;

    @Column({ field: "video", type: DataType.TEXT })
    video: string;

    @Column({ field: "base_price", type: DataType.DECIMAL(15, 2) })
    basePrice: string;

    @Column({ field: "show_price", type: DataType.DECIMAL(15, 2) })
    showPrice: string;

    @Column({ field: "discount_type", type: DataType.TEXT })
    discountType: ProductDiscountTypeEnum;

    @Column({ field: "discount_amount", type: DataType.DECIMAL(15, 2) })
    discountAmount: string;

    @Column({ field: "rating", type: DataType.DECIMAL(3, 1) })
    rating: string;

    @Column({ field: "status", type: DataType.BOOLEAN, defaultValue: false })
    status: boolean;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "content", type: DataType.TEXT })
    content: string;

    @Column({ field: "priority", type: DataType.INTEGER })
    priority: number;

    @Column({ field: "stock_quantity", type: DataType.INTEGER })
    stockQuantity: number;

    @Column({ field: "tags", type: DataType.TEXT })
    tags: string;

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

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsToMany(() => EcomCategory, {
        through: () => ProductCategory, //"ecom_product_categories",
        as: "ecomCategories",
        foreignKey: "ecom_product_id",
        otherKey: "ecom_category_id",
    })
    ecomCategories: EcomCategory[];

    // @BelongsToMany(() => EcomCategory, () => ProductCategory)
    // ecomCategories: EcomCategory[];

    @HasMany(() => Media, {
        foreignKey: "mediaable_id",
        constraints: false,
        scope: {
            mediaable_type: MediaAbleTypeEnum.ECOM_PRODUCT,
        },
    })
    media: Media[];

    @BelongsToMany(() => Color, {
        through: () => ProductColor,
        foreignKey: "ecom_product_id",
        otherKey: "ecom_color_id",
        constraints: false,
    })
    colors: Color[];

    @BelongsToMany(() => Size, {
        through: () => ProductSize,
        foreignKey: "product_id",
        otherKey: "size_id",
        constraints: false,
    })
    sizes: Size[];

    @HasMany(() => ProductGallery, {
        foreignKey: "ecom_product_id",
        constraints: false,
    })
    galleries: ProductGallery[];

    @HasMany(() => Favorites, {
        foreignKey: "product_id",
        constraints: false,
    })
    favorites: Favorites[];

    @HasMany(() => OrderDetail, {
        foreignKey: "product_id",
        as: "orderDetails",
    })
    orderDetails: OrderDetail[];

    @HasMany(() => ProductColor, {
        foreignKey: "ecom_product_id",
        as: "productColors",
    })
    productColors: ProductColor[];

    @HasMany(() => ProductSize, {
        foreignKey: "product_id",
        as: "productSizes",
    })
    productSizes: ProductSize[];
}

// Autoload Model
export default Product;
