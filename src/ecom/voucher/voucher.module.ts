import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Voucher from "@src/ecom/voucher/entities/voucher.entity";
import { VoucherRepository } from "@src/ecom/voucher/voucher.repository";
import { VoucherController } from "./voucher.controller";
import { VoucherService } from "./voucher.service";

@Module({
    imports: [SequelizeModule.forFeature([Voucher])],
    controllers: [VoucherController],
    providers: [VoucherService, VoucherRepository],
    exports: [VoucherService, VoucherRepository],
})
export class VoucherModule {}
