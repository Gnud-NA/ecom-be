import { BaseModelSequelize } from "@src/base";
import { TierTypeEnum } from "@src/config";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import TierRewardEvent from "@src/ecom/tier-reward-event/entities/tier-reward-event.entity";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, HasMany, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_tiers",
})
export class Tier extends BaseModelSequelize<Tier> {
    @Expose()
    @Column({ field: "name", type: DataType.STRING, allowNull: false })
    name: string;

    @Expose()
    @Column({
        field: "type",
        type: DataType.ENUM(...Object.keys(TierTypeEnum).map((key) => TierTypeEnum[key as keyof typeof TierTypeEnum])),
        allowNull: false,
    })
    type: TierTypeEnum;

    @Expose()
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @Expose()
    @Column({ type: DataType.INTEGER, allowNull: false })
    level: number;

    @Expose()
    @Column({ field: "spend_required", type: DataType.DECIMAL(10, 2), allowNull: true })
    spendRequired: number;

    @Expose()
    @HasMany(() => TierBenefit, { foreignKey: "tier_id", as: "tierBenefits" })
    tierBenefits: TierBenefit[];

    @Expose()
    @HasMany(() => TierRewardEvent, { foreignKey: "tier_id", as: "tierRewardEvents" })
    tierRewardEvents: TierRewardEvent[];
}

// Autoload Model
export default Tier;
