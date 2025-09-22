import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import State from "@src/ecom/state/entities/state.entity";
import { StateRepository } from "@src/ecom/state/state.repository";
import { StateController } from "./state.controller";
import { StateService } from "./state.service";

@Module({
    imports: [SequelizeModule.forFeature([State])],
    controllers: [StateController],
    providers: [StateService, StateRepository],
    exports: [StateService, StateRepository],
})
export class StateModule {}
