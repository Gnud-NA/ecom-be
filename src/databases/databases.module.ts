import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { MongodbConfig, SequelizeConfig } from "./databases.provider";

@Module({
    imports: [
        SequelizeModule.forRootAsync({ useFactory: SequelizeConfig.useFactory }),
        MongooseModule.forRootAsync(MongodbConfig),
    ],
    providers: [],
})
export class DatabasesModule {}
