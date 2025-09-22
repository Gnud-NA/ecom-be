import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { LoginTypeEnum } from "@src/config";
import { Exclude } from "class-transformer";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Exclude()
@Table({ tableName: "wf_devices" })
export class Device extends BaseModelSequelize<Device> {
    @Column({ type: "int", field: "user_id" })
    @ForeignKey(() => User)
    userId: string;

    @Column({ type: DataType.TEXT(), field: "access_token" })
    accessToken?: string;

    @Column({ type: DataType.TEXT(), field: "refresh_token" })
    refreshToken?: string;

    @Column({ type: DataType.STRING(256) })
    name: string;

    @Column({ type: DataType.TEXT(), field: "device_uuid" })
    deviceUuid: string;

    @Column({ type: DataType.TEXT() })
    type: LoginTypeEnum;
    /*** Relations ****************/

    @BelongsTo(() => User, "user_id")
    user: User;
}

// Autoload Model
export default Device;
