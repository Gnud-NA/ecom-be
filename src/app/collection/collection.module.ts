import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CollectionRepository } from "@src/app/collection/collection.repository";
import Collection from "@src/app/collection/entities/collection.entity";
import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";

@Module({
    imports: [SequelizeModule.forFeature([Collection])],
    controllers: [CollectionController],
    providers: [CollectionService, CollectionRepository],
})
export class CollectionModule {}
