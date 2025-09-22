import { BaseModelSequelize } from "@src/base";
import { TierBenefitTypeEnum } from "@src/config";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { Exclude, Expose } from "class-transformer";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_tier_benefits",
})
export class TierBenefit extends BaseModelSequelize<TierBenefit> {
    @Expose()
    @Column({ field: "tier_id", type: DataType.INTEGER, allowNull: false })
    tierId: number;

    @Expose()
    @Column({ field: "name", type: DataType.STRING, allowNull: true })
    name: string;

    @Expose()
    @Column({ field: "description", type: DataType.STRING, allowNull: true })
    description: string;

    @Expose()
    @Column({ field: "priority", type: DataType.INTEGER, allowNull: true })
    priority: number;

    @Expose()
    @Column({ field: "point", type: DataType.INTEGER, allowNull: false })
    point: number;

    @Expose()
    @Column({ field: "type", type: DataType.ENUM(...Object.values(TierBenefitTypeEnum)), allowNull: false })
    type: TierBenefitTypeEnum;

    @Expose()
    @BelongsTo(() => Tier, { foreignKey: "tier_id" })
    tier: Tier;
}

// Autoload Model
export default TierBenefit;
