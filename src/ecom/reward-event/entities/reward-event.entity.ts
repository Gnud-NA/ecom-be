import Media from "@src/app/media/entities/media.entity";
import { BaseModelSequelize } from "@src/base";
import { RewardEventTypeEnum } from "@src/config";
import TierRewardEvent from "@src/ecom/tier-reward-event/entities/tier-reward-event.entity";
import { Exclude, Expose, Transform } from "class-transformer";
import { BelongsTo, Column, DataType, HasMany, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_reward_events",
})
export class RewardEvent extends BaseModelSequelize<RewardEvent> {
    @Expose()
    @Column({ field: "name", type: DataType.STRING, allowNull: false })
    name: string;

    @Expose()
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @Expose()
    @Column({
        field: "type",
        type: DataType.ENUM(
            ...Object.keys(RewardEventTypeEnum).map(
                (key) => RewardEventTypeEnum[key as keyof typeof RewardEventTypeEnum]
            )
        ),
        allowNull: false,
    })
    type: RewardEventTypeEnum;

    @Expose()
    @Column({ field: "media_id", type: DataType.INTEGER, allowNull: true })
    @Transform(({ value }) => Number(value) ?? null)
    mediaId: number;

    @Expose()
    @Column({ field: "icon_url", type: DataType.STRING, allowNull: true })
    iconUrl: string;

    @Expose()
    @Column({ field: "default_point", type: DataType.INTEGER, allowNull: false })
    defaultPoint: number;

    @Expose()
    @HasMany(() => TierRewardEvent, { foreignKey: "reward_event_id", as: "tierRewardEvents" })
    tierRewardEvents: TierRewardEvent[];

    @Expose()
    @BelongsTo(() => Media, { foreignKey: "media_id", as: "media" })
    media: Media;
}

// Autoload Model
export default RewardEvent;
