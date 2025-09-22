import { BaseModelSequelize } from "@src/base";
import { Exclude } from "class-transformer";
import { Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_registry_events",
})
export class RegistryEvent extends BaseModelSequelize<RegistryEvent> {
    @Column({ field: "name", type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ field: "description", type: DataType.STRING, allowNull: true })
    description: string;
}

// Autoload Model
export default RegistryEvent;
