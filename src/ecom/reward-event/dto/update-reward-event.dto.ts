import { PartialType } from "@nestjs/swagger";
import { CreateRewardEventDto } from "@src/ecom/reward-event/dto/create-reward-event.dto";

export class UpdateRewardEventDto extends PartialType(CreateRewardEventDto) {}
