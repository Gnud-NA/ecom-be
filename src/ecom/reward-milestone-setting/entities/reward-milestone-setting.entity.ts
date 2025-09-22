import { BaseModelSequelize } from "@src/base";
import { RewardMilestoneStatusEnum } from "@src/config";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_reward_milestone_settings",
})
export class RewardMilestoneSetting extends BaseModelSequelize<RewardMilestoneSetting> {
    @Expose()
    @Column({ field: "point_threshold", type: DataType.INTEGER, allowNull: false })
    pointThreshold: number;

    @Expose()
    @Column({ field: "amount_reward", type: DataType.INTEGER, allowNull: false })
    amountReward: number;

    @Expose()
    @Column({
        field: "status",
        type: DataType.ENUM(
            ...Object.keys(RewardMilestoneStatusEnum).map(
                (key) => RewardMilestoneStatusEnum[key as keyof typeof RewardMilestoneStatusEnum]
            )
        ),
        allowNull: false,
    })
    status: RewardMilestoneStatusEnum;

    @Expose()
    @Column({ field: "priority", type: DataType.INTEGER, allowNull: true })
    priority: number;

    @Expose()
    @Column({ field: "description", type: DataType.TEXT, allowNull: true })
    description: string;
}

// Autoload Model
export default RewardMilestoneSetting;
