import { BaseModelSequelize } from "@src/base";
import { DomainEnum } from "@src/config";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "wf_settings" })
export class Setting extends BaseModelSequelize<Setting> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "isMaintain", type: DataType.BOOLEAN })
    isMaintain: boolean;

    @Column({ field: "domain", type: DataType.TEXT, defaultValue: DomainEnum.REMEMBER_NGUYEN })
    domain: string;

    @Column({ field: "title", type: DataType.TEXT })
    title: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "keyword", type: DataType.TEXT })
    keyword: string;

    @Column({ field: "logo", type: DataType.TEXT })
    logo: string;

    @Column({ field: "sub_logo", type: DataType.TEXT })
    subLogo: string;

    @Column({ field: "favicon", type: DataType.TEXT })
    favicon: string;

    @Column({ field: "google_analytic", type: DataType.TEXT })
    googleAnanlytic: string;

    @Column({ field: "fanpage", type: DataType.TEXT })
    fanpage: string;

    @Column({ field: "footer_description", type: DataType.TEXT })
    footerDescription: string;

    @Column({ field: "google_link", type: DataType.TEXT })
    googleLink: string;

    @Column({ field: "facebook_link", type: DataType.TEXT })
    facebookLink: string;

    @Column({ field: "pinterest_link", type: DataType.TEXT })
    pinterestLink: string;

    @Column({ field: "twitter_link", type: DataType.TEXT })
    twitterLink: string;

    @Column({ field: "slogan", type: DataType.TEXT })
    slogan: string;

    @Column({ field: "email", type: DataType.TEXT })
    email: string;

    @Column({ field: "mobile", type: DataType.TEXT })
    mobile: string;

    @Column({ field: "phone", type: DataType.TEXT })
    phone: string;

    @Column({ field: "address", type: DataType.TEXT })
    address: string;

    @Column({ field: "youtube_link", type: DataType.TEXT })
    youtubeLink: string;

    @Column({ field: "youtube_chanel", type: DataType.TEXT })
    youtubeChannel: string;

    @Column({ field: "zalo", type: DataType.TEXT })
    zalo: string;

    @Column({ field: "skype", type: DataType.TEXT })
    skype: string;

    @Column({ field: "telegram_bot_token", type: DataType.TEXT })
    telegramBotToken: string;

    @Column({ field: "telegram_chat_id", type: DataType.TEXT })
    telegramChatId: string;
}

// Autoload Model
export default Setting;
