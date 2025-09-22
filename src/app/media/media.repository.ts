import { Injectable } from "@nestjs/common";
import Media from "@src/app/media/entities/media.entity";
import { BaseRepositorySequelize, BaseUpdatedResponse } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class MediaRepository extends BaseRepositorySequelize<Media> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Media");
    }

    async updateByName(name: string, request: any): Promise<BaseUpdatedResponse<Media>> {
        await this.model.update(request, {
            where: { name },
        });
        return { status: true };
    }
}
