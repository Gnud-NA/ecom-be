import { BaseModelSequelize } from "@src/base";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { Exclude, Expose } from "class-transformer";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_tier_reward_events",
})
export class TierRewardEvent extends BaseModelSequelize<TierRewardEvent> {
    @Expose()
    @Column({ field: "tier_id", type: DataType.INTEGER, allowNull: false })
    tierId: number;

    @Expose()
    @Column({ field: "reward_event_id", type: DataType.INTEGER, allowNull: false })
    rewardEventId: number;

    @Expose()
    @Column({
        field: "point_override",
        type: DataType.INTEGER,
        allowNull: true,
    })
    pointOverride: number;

    @Expose()
    @BelongsTo(() => Tier, { foreignKey: "tier_id", as: "tier" })
    tier: Tier;

    @Expose()
    @BelongsTo(() => RewardEvent, { foreignKey: "reward_event_id", as: "rewardEvent" })
    rewardEvent: RewardEvent;
}

export default TierRewardEvent;
