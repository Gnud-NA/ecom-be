import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class FavoritesRepository extends BaseRepositorySequelize<Favorites> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Favorites");
    }
}
