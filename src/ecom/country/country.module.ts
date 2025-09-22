import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CountryRepository } from "@src/ecom/country/country.repository";
import Country from "@src/ecom/country/entities/country.entity";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";

@Module({
    imports: [SequelizeModule.forFeature([Country])],
    controllers: [CountryController],
    providers: [CountryService, CountryRepository],
    exports: [CountryService, CountryRepository],
})
export class CountryModule {}
