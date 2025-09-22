import { BaseModelSequelize } from "@src/base";
import Color from "@src/ecom/color/entities/color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import Registry from "@src/ecom/registry/entities/registry.entity";
import Size from "@src/ecom/size/entities/size.entity";
import { Expose, Type } from "class-transformer";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({
    tableName: "ecom_registry_details",
})
export class RegistryDetail extends BaseModelSequelize<RegistryDetail> {
    @Expose()
    @ForeignKey(() => Product)
    @Column({ field: "product_id", type: DataType.BIGINT, allowNull: false })
    @Type(() => Number)
    productId: number;

    @Expose()
    @ForeignKey(() => Registry)
    @Column({ field: "registry_id", type: DataType.BIGINT, allowNull: false })
    @Type(() => Number)
    registryId: number;

    @Expose()
    @ForeignKey(() => Color)
    @Column({ field: "color_id", type: DataType.BIGINT, allowNull: true })
    @Type(() => Number)
    colorId: number;

    @Expose()
    @ForeignKey(() => Size)
    @Column({ field: "size_id", type: DataType.BIGINT, allowNull: true })
    @Type(() => Number)
    sizeId: number;

    @Expose()
    @Type(() => Color)
    @BelongsTo(() => Color, "color_id")
    color: Color;

    @Expose()
    @Type(() => Size)
    @BelongsTo(() => Size, "size_id")
    size: Size;

    @Expose()
    @Type(() => Product)
    @BelongsTo(() => Product, "product_id")
    product: Product;

    @Expose()
    @Type(() => Registry)
    @BelongsTo(() => Registry, "registry_id")
    registry: Registry;
}

// Autoload Model
export default RegistryDetail;
