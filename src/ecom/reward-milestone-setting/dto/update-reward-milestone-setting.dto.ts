import { PartialType } from "@nestjs/swagger";
import { CreateRewardMilestoneSettingDto } from "@src/ecom/reward-milestone-setting/dto/create-reward-milestone-setting.dto";

export class UpdateRewardMilestoneSettingDto extends PartialType(CreateRewardMilestoneSettingDto) {}
