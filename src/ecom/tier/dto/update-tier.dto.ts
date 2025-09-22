import { PartialType } from "@nestjs/swagger";
import { CreateTierDto } from "@src/ecom/tier/dto/create-tier.dto";

export class UpdateTierDto extends PartialType(CreateTierDto) {}
