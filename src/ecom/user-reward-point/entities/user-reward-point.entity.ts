import { BaseModelSequelize } from "@src/base";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import { Exclude, Expose } from "class-transformer";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_user_reward_points",
})
export class UserRewardPoint extends BaseModelSequelize<UserRewardPoint> {
    @Expose()
    @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
    userId: string;

    @Expose()
    @Column({ field: "reward_event_id", type: DataType.STRING, allowNull: false })
    rewardEventId: string;

    @Expose()
    @Column({ field: "point", type: DataType.INTEGER, allowNull: false })
    point: number;

    @Expose()
    @Column({ field: "metadata", type: DataType.JSON, allowNull: true })
    metaData: Record<string, any>;

    @Expose()
    @BelongsTo(() => RewardEvent, {
        foreignKey: "reward_event_id",
        as: "rewardEvent",
    })
    rewardEvent: RewardEvent;
}

// Autoload Model
export default UserRewardPoint;
