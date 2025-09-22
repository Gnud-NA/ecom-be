import { BaseModelSequelize } from "@src/base";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_countries" })
export class Country extends BaseModelSequelize<Country> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.CHAR(3),
    })
    iso3: string;

    @Column({
        type: DataType.CHAR(3),
    })
    numeric_code: string;

    @Column({
        type: DataType.CHAR(2),
    })
    iso2: string;

    @Column({
        type: DataType.STRING(255),
    })
    phonecode: string;

    @Column({
        type: DataType.STRING(255),
    })
    capital: string;

    @Column({
        type: DataType.STRING(255),
    })
    currency: string;

    @Column({
        field: "currency_name",
        type: DataType.STRING(255),
    })
    currencyName: string;

    @Column({
        field: "currency_symbol",
        type: DataType.STRING(255),
    })
    currencySymbol: string;

    @Column({
        type: DataType.STRING(255),
    })
    tld: string;

    @Column({
        type: DataType.STRING(255),
    })
    native: string;

    @Column({
        type: DataType.STRING(255),
    })
    region: string;

    @Column({
        field: "region_id",
        type: DataType.BIGINT,
    })
    regionId: number;

    @Column({
        type: DataType.STRING(255),
    })
    subregion: string;

    @Column({
        field: "subregion_id",
        type: DataType.BIGINT,
    })
    subregionId: number;

    @Column({
        type: DataType.STRING(255),
    })
    nationality: string;

    @Column({
        type: DataType.TEXT,
    })
    timezones: string;

    @Column({
        type: DataType.TEXT,
    })
    translations: string;

    @Column({
        type: DataType.DECIMAL(10, 8),
    })
    latitude: number;

    @Column({
        type: DataType.DECIMAL(11, 8),
    })
    longitude: number;

    @Column({
        type: DataType.STRING(191),
    })
    emoji: string;

    @Column({
        type: DataType.STRING(191),
    })
    emojiU: string;

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
}

export default Country;
