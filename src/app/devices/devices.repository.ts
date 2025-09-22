import { Injectable } from "@nestjs/common";
import Device from "@src/app/devices/entities/device.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class DeviceRepository extends BaseRepositorySequelize<Device> {
  constructor(public sequelize: Sequelize) {
    super(sequelize, "Device");
  }
}
