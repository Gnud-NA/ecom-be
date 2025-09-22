import { BaseModelSequelize } from "@src/base";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_user_achieved_thresholds",
})
export class UserAchievedThresholds extends BaseModelSequelize<UserAchievedThresholds> {
    @Expose()
    @Column({ field: "user_id", type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Expose()
    @Column({ field: "reward_milestone_setting_id", type: DataType.INTEGER, allowNull: false })
    rewardMilestoneSettingId: number;

    @Expose()
    @Column({ field: "amount", type: DataType.DECIMAL(10, 2) })
    amount: number;

    @Expose()
    @Column({ field: "claimed_at", type: "timestamptz" })
    claimedAt: Date;

    @Expose()
    @Column({ field: "metadata", type: DataType.JSON, allowNull: false })
    metadata: Record<string, any>;
}

// Autoload Model
export default UserAchievedThresholds;
