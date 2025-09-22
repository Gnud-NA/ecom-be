import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserRepository } from "@src/app/users/users.repository";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { UserAchievedThresholdsService } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.service";
import { UserRewardPointRepository } from "@src/ecom/user-reward-point/user-reward-point.repository";
import { RewardMilestoneSettingRepository } from "../reward-milestone-setting/reward-milestone-setting.repository";
import { WalletTransactionRepository } from "../wallet-transaction/wallet-transaction.repository";
import Wallet from "./entities/wallet.entity";
import { WalletRepository } from "./wallet.repository";
import { WalletService } from "./wallet.service";

@Module({
    imports: [SequelizeModule.forFeature([Wallet])],
    controllers: [],
    providers: [
        WalletService,
        WalletRepository,
        UserRepository,
        UserRewardPointRepository,
        RewardMilestoneSettingRepository,
        WalletTransactionRepository,
        UserAchievedThresholdsRepository,
        UserAchievedThresholdsService,
    ],
    exports: [WalletService],
})
export class WalletModule {}
