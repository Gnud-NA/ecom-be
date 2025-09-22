import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import WalletTransaction from "./entities/wallet-transaction.entity";
import { WalletTransactionRepository } from "./wallet-transaction.repository";
import { WalletTransactionService } from "./wallet-transaction.service";

@Module({
    imports: [SequelizeModule.forFeature([WalletTransaction])],
    controllers: [],
    providers: [WalletTransactionService, WalletTransactionRepository],
    exports: [WalletTransactionService],
})
export class WalletTransactionModule {}
