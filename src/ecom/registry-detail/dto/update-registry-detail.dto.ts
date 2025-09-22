import { PartialType } from "@nestjs/swagger";
import { CreateRegistryDetailDto } from "./create-registry-detail.dto";

export class UpdateRegistryDetailDto extends PartialType(CreateRegistryDetailDto) {}
