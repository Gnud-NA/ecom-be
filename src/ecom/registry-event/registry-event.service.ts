import { Injectable } from "@nestjs/common";
import { BaseResponse } from "@src/base";
import { RegistryEventFilter } from "@src/ecom/registry-event/dto/registry-event.dto";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import RegistryEvent from "./entities/registry-event.entity";
import { RegistryEventRepository } from "./registry-event.repository";

@Injectable()
export class RegistryEventService {
    constructor(private registryEventRepo: RegistryEventRepository) {}

    // async create(createRegistryEventDto: CreateRegistryEventDto): Promise<RegistryEvent> {
    //     const registryEvent = await this.registryEventRepo.create({ ...createRegistryEventDto });
    //     return registryEvent;
    // }

    async findAll(filter?: RegistryEventFilter): Promise<BaseResponse<RegistryEvent[]>> {
        const { count, data } = await this.registryEventRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return { count, data };
    }

    // async findOne(id: number): Promise<RegistryEvent> {
    //     const registryEvent = await this.registryEventRepo.findOne({ where: { id } });
    //     if (!registryEvent) {
    //         throw new BadRequestException("Registry event not found");
    //     }
    //     return registryEvent;
    // }

    // async update(
    //     id: number,
    //     updateRegistryEventDto: UpdateRegistryEventDto
    // ): Promise<BaseUpdatedResponse<RegistryEvent>> {
    //     const registryEvent = await this.registryEventRepo.findById(id);
    //     if (!registryEvent) {
    //         throw new BadRequestException("Registry event not found");
    //     }
    //     await registryEvent.update({ ...registryEvent, ...updateRegistryEventDto });
    //     return {
    //         status: true,
    //         data: registryEvent,
    //     };
    // }

    // async delete(id: number): Promise<BaseDeletedResponse> {
    //     const registryEvent = await this.registryEventRepo.findById(id);
    //     if (!registryEvent) {
    //         throw new BadRequestException("Registry event not found");
    //     }
    //     await registryEvent.destroy();
    //     return { status: true };
    // }
}
