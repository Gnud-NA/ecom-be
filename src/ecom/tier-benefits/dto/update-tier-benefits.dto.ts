import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTierBenefitDto } from "@src/ecom/tier-benefits/dto/create-tier-benefits.dto";

export class UpdateTierBenefitDto extends PartialType(OmitType(CreateTierBenefitDto, ["tierId"])) {}
