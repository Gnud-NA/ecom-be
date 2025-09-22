import { BaseModelSequelize } from "@src/base";
import Country from "@src/ecom/country/entities/country.entity";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_states" })
export class State extends BaseModelSequelize<State> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name: string;

    @Column({
        field: "tax_amount",
        type: DataType.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
    })
    taxAmount: number;

    @Column({
        field: "shipping_amount",
        type: DataType.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
    })
    shippingAmount: number;

    @Column({
        field: "is_default",
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    })
    isDefault: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    })
    status: boolean;

    @Column({
        field: "country_id",
        type: DataType.BIGINT,
        allowNull: false,
    })
    countryId: number;

    @Column({
        field: "country_code",
        type: DataType.CHAR(2),
        allowNull: false,
    })
    countryCode: string;

    @Column({
        field: "fips_code",
        type: DataType.STRING(255),
    })
    fipsCode: string;

    @Column({
        type: DataType.STRING(255),
    })
    iso2: string;

    @Column({
        type: DataType.STRING(191),
    })
    type: string;

    @Column({
        type: DataType.DECIMAL(10, 8),
    })
    latitude: number;

    @Column({
        type: DataType.DECIMAL(11, 8),
    })
    longitude: number;

    @Column({
        type: DataType.SMALLINT,
        defaultValue: 1,
    })
    flag: number;

    @Column({
        field: "wiki_data_id",
        type: DataType.STRING(255),
    })
    wikiDataId: string;

    @BelongsTo(() => Country, "country_id")
    country: Country;
}

export default State;
