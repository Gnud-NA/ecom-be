import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTierRewardEventDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Tier id",
        example: 1,
        required: true,
    })
    tierId: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Reward event id",
        example: 1,
    })
    rewardEventId: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Point override",
        example: 100,
    })
    pointOverride: number;

    // @BelongsTo(() => Tier, { foreignKey: "tier_id", as: "tier" })
    // tier: Tier;

    // @BelongsTo(() => RewardEvent, { foreignKey: "reward_event_id", as: "rewardEvent" })
    // rewardEvent: RewardEvent;
}
