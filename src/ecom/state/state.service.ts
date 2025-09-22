import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreateStateDto } from "@src/ecom/state/dto/create-state.dto";
import { FilterStateDto } from "@src/ecom/state/dto/state.dto";
import { UpdateStateDto } from "@src/ecom/state/dto/update-state.dto";
import State from "@src/ecom/state/entities/state.entity";
import { StateRepository } from "@src/ecom/state/state.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class StateService extends BaseService<State, StateRepository> {
    constructor(
        @Inject(StateRepository)
        private readonly stateRepository: StateRepository,
        private sequelize: Sequelize
    ) {
        super(stateRepository);
    }

    async create(createStateDto: CreateStateDto) {
        const state = await this.stateRepository.create(createStateDto);
        return await this.findOne(state.id);
    }

    async findAll(filter?: FilterStateDto): Promise<BaseResponse<State[]>> {
        const states = await this.stateRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.stateRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return {
            count,
            data: states,
        };
    }

    async update(id: number, updateStateDto: UpdateStateDto) {
        await this.stateRepository.updateByIdWithBase(id, updateStateDto);

        const state = await this.stateRepository.findById(id);

        return this.findOne(state.id);
    }
}
