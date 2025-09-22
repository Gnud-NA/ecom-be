import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTierRewardEventDto } from "./create-tier-reward-event.dto";

export class UpdateTierRewardEventDto extends PartialType(
    OmitType(CreateTierRewardEventDto, ["tierId", "rewardEventId"])
) {}
