import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CountryRepository } from "@src/ecom/country/country.repository";
import { FilterCountryDto } from "@src/ecom/country/dto/country.dto";
import { CreateCountryDto } from "@src/ecom/country/dto/create-country.dto";
import { UpdateCountryDto } from "@src/ecom/country/dto/update-country.dto";
import Country from "@src/ecom/country/entities/country.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CountryService extends BaseService<Country, CountryRepository> {
    constructor(
        @Inject(CountryRepository)
        private readonly countryRepository: CountryRepository,
        private sequelize: Sequelize
    ) {
        super(countryRepository);
    }

    async create(createCountryDto: CreateCountryDto) {
        const country = await this.countryRepository.create(createCountryDto);
        return await this.findOne(country.id);
    }

    async findAll(filter?: FilterCountryDto): Promise<BaseResponse<Country[]>> {
        const countries = await this.countryRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.countryRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: countries,
        };
    }

    async update(id: number, updateCountryDto: UpdateCountryDto) {
        await this.countryRepository.updateByIdWithBase(id, updateCountryDto);

        const country = await this.countryRepository.findById(id);

        return this.findOne(country.id);
    }
}
