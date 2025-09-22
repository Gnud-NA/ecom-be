import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentModule } from "@src/ecom/payment/payment.module";
import UserBankCard from "@src/ecom/user-bank-card/entities/user-bank-card.entity";
import { UserBankCardController } from "./user-bank-card.controller";
import { UserBankCardRepository } from "./user-bank-card.repository";
import { UserBankCardService } from "./user-bank-card.service";

@Module({
    imports: [SequelizeModule.forFeature([UserBankCard]), PaymentModule],
    controllers: [UserBankCardController],
    providers: [UserBankCardService, UserBankCardRepository],
    exports: [UserBankCardService],
})
export class UserBankCardModule {}
