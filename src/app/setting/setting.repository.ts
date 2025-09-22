import { Injectable } from "@nestjs/common";
import Setting from "@src/app/setting/entities/setting.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SettingRepository extends BaseRepositorySequelize<Setting> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Setting");
    }

    async getSettingByWeb(filter: any) {
        return this.model.findOne({
            where: { ...filter.where },
            attributes: [
                "id",
                "domain",
                "isMaintain",
                "title",
                "description",
                "keyword",
                "logo",
                "subLogo",
                "favicon",
                "googleAnanlytic",
                "fanpage",
                "footerDescription",
                "googleLink",
                "facebookLink",
                "pinterestLink",
                "twitterLink",
                "slogan",
                "email",
                "mobile",
                "phone",
                "address",
                "youtubeLink",
                "youtubeChannel",
                "zalo",
                "skype",
            ],
        });
    }
}
