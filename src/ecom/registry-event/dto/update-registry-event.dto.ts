import { PartialType } from "@nestjs/mapped-types";
import { CreateRegistryEventDto } from "@src/ecom/registry-event/dto/create-registry-event.dto";

export class UpdateRegistryEventDto extends PartialType(CreateRegistryEventDto) {}
