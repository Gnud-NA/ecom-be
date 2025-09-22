import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@src/app/users/users.repository";
import { BaseDeletedResponse, BaseResponse, BaseService, BaseUpdatedResponse } from "@src/base";
import { RegistryDetailRepository } from "@src/ecom/registry-detail/registry-detail.repository";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import { RegistryEventRepository } from "@src/ecom/registry-event/registry-event.repository";
import { RegistryFilter } from "@src/ecom/registry/dto/registry.dto";
import { UpdateRegistryDto } from "@src/ecom/registry/dto/update-registry.dto";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { Op, col, fn, where } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { CreateRegistryDto } from "./dto/create-registry.dto";
import Registry from "./entities/registry.entity";
import { RegistryRepository } from "./registry.repository";
import moment = require("moment");

@Injectable()
export class RegistryService extends BaseService<Registry, RegistryRepository> {
    constructor(
        private registryRepo: RegistryRepository,
        private userRepo: UserRepository,
        private registryEventRepo: RegistryEventRepository,
        private registryDetailRepo: RegistryDetailRepository,
        private sequelize: Sequelize
    ) {
        super(registryRepo);
    }

    async createRegistry(createRegistryDto: CreateRegistryDto, userId: number): Promise<Registry> {
        try {
            const registryEvent = await this.registryEventRepo.findById(createRegistryDto.registryEventId);
            if (!registryEvent) {
                throw new NotFoundException("Registry event not found");
            }

            if (createRegistryDto.eventDate) {
                const today = moment();
                const eventDate = moment(createRegistryDto.eventDate);

                const diffDays = today.diff(eventDate, "days");
                if (diffDays > 0) {
                    throw new BadRequestException("Cannot create events in the past");
                }
            }

            const user = await this.userRepo.findById(userId);
            if (!user) {
                throw new NotFoundException("User not found");
            }
            const registry = await this.registryRepo.create({ ...createRegistryDto, userId });

            const data = plainToInstance(Registry, registry, {
                excludeExtraneousValues: true,
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getExistingItems(
        userId: number,
        registryId: number
    ): Promise<BaseResponse<{ productId: number; colorId: number; sizeId: number }[]>> {
        try {
            const registry = await this.registryRepo.findById(Number(registryId) || 0);
            if (!registry) {
                throw new NotFoundException("Registry not found");
            }

            if (!userId) {
                throw new ForbiddenException("Invalid user id");
            }

            const { count, data } = await this.registryDetailRepo.findAndCount({
                include: [
                    {
                        model: Registry,
                        as: "registry",
                        where: { userId, deletedAt: null, id: registryId },
                        required: true,
                        attributes: [],
                    },
                ],
                attributes: ["productId", "colorId", "sizeId"],
                raw: true,
            });

            const mappedData = data.map((item) => {
                return {
                    productId: Number(item.productId),
                    colorId: item.colorId,
                    sizeId: item.sizeId,
                };
            });

            return {
                count,
                data: mappedData as any,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: RegistryFilter, userId?: number): Promise<BaseResponse<Registry[]>> {
        try {
            const nameConditions = [];

            if (filter.firstName) {
                nameConditions.push({
                    firstName: { [Op.like]: `%${filter.firstName}%` },
                });
            }

            if (filter.lastName) {
                nameConditions.push({
                    lastName: { [Op.like]: `%${filter.lastName}%` },
                });
            }

            const whereCondition = {
                ...(nameConditions.length === 2
                    ? { [Op.and]: nameConditions }
                    : nameConditions.length === 1
                    ? nameConditions[0]
                    : {}),
            };

            const { count, data } = await this.registryRepo.findAndCount({
                ...convertFilterWithOrderBy(filter),
                where: {
                    ...convertFilterWithWhere(filter),
                    ...(userId && { userId }),
                    ...(filter.year && {
                        eventDate: {
                            [Op.between]: [new Date(`${filter.year}-01-01`), new Date(`${filter.year}-12-31`)],
                        },
                    }),

                    ...(filter.month && {
                        [Op.and]: [where(fn("DATE_PART", "month", col("event_date")), Number(filter.month))],
                    }),

                    ...whereCondition,
                    ...(filter.search && { fullName: { [Op.like]: `%${filter.search}%` } }),
                    ...(filter.state && { state: filter.state }),
                },
                include: [
                    {
                        model: RegistryEvent,
                        as: "registryEvent",
                    },
                ],
            });

            const _data = plainToInstance(Registry, data, {
                excludeExtraneousValues: true,
            });

            return { count, data: _data };
        } catch (error) {
            throw error;
        }
    }

    async findOneRegistry(id: number, requesterId: number): Promise<Registry> {
        try {
            const registry = await this.registryRepo.findOne({
                where: { id, userId: requesterId },
                include: [
                    {
                        model: RegistryEvent,
                        as: "registryEvent",
                    },
                ],
            });
            if (!registry) {
                throw new BadRequestException("Registry not found");
            }

            const data = plainToInstance(Registry, registry, {
                excludeExtraneousValues: true,
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateRegistryDto: UpdateRegistryDto): Promise<BaseUpdatedResponse<Registry>> {
        try {
            if (updateRegistryDto.registryEventId) {
                const registryEvent = await this.registryEventRepo.findById(updateRegistryDto.registryEventId);
                if (!registryEvent) {
                    throw new BadRequestException("Registry event not found");
                }
            }

            const registry = await this.registryRepo.findById(id);
            if (!registry) {
                throw new BadRequestException("Registry not found");
            }

            if (registry.eventDate) {
                const today = moment();
                const eventDate = moment(registry.eventDate);

                const diffDays = today.diff(eventDate, "days");
                if (diffDays > 0) {
                    throw new ForbiddenException("This event happened in the past");
                }
            }

            await registry.update(updateRegistryDto);

            const newRegistry = await this.registryRepo.findById(id);

            const data = plainToInstance(Registry, newRegistry, {
                excludeExtraneousValues: true,
            });

            return {
                status: true,
                data,
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteRegistry(id: number, requesterId: number): Promise<BaseDeletedResponse> {
        try {
            const result = await this.sequelize.transaction(async (t) => {
                const registry = await this.registryRepo.findById(id);
                if (!registry) {
                    throw new BadRequestException("Registry not found");
                }

                if (Number(registry.userId) !== Number(requesterId)) {
                    throw new ForbiddenException("You are not allowed to delete this registry");
                }

                await this.registryRepo.delete(id, t);

                await this.registryDetailRepo.deleteWidthCondition({
                    deleteWidthCondition: { registryId: id },
                    transaction: t,
                });
                return { status: true };
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}
