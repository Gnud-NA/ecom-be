import { Process, Processor } from "@nestjs/bull";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@src/app/users/users.repository";
import { ClaimRewardDto } from "@src/app/web-app/dto/web-app.dto";
import {
    EcomWalletTypeEnum,
    WalletTransactionEventTypeEnum,
    WalletTransactionSourceEnum,
    WalletTransactionTypeEnum,
} from "@src/config/ecom";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { WalletTransactionRepository } from "@src/ecom/wallet-transaction/wallet-transaction.repository";
import { WalletService } from "@src/ecom/wallet/wallet.service";
import { LoggerService } from "@src/logger/logger.service";
import { Job } from "bull";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Processor("claim-reward")
@Injectable()
export class RewardProcessor {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly userRepo: UserRepository,
        private readonly walletService: WalletService,
        private readonly walletTransactionRepo: WalletTransactionRepository,
        protected readonly logger: LoggerService,
        private readonly userAchievedThresholdsRepo: UserAchievedThresholdsRepository
    ) {}

    @Process("claim-reward")
    async handleClaimReward(job: Job<ClaimRewardDto & { userId: number }>) {
        const { userId } = job.data;

        try {
            return await this.sequelize.transaction(
                { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
                async (t) => {
                    const requesterUser = await this.userRepo.findOne({
                        where: { id: userId },
                        transaction: t,
                    });

                    if (!requesterUser) {
                        throw new Error("Invalid user");
                    }

                    if (!requesterUser.membershipActive) {
                        throw new Error("User is not an active member");
                    }

                    const { yourUnclaimedReward, userAchievedThreshold, rewardMilestoneSetting } =
                        await this.walletService.calculateYourUnclaimedReward({ userId }, t);

                    if (yourUnclaimedReward <= 0) {
                        throw new NotFoundException("No reward to claim");
                    }

                    const wallet = await this.walletService.getWallet(
                        { userId, walletType: EcomWalletTypeEnum.REWARD },
                        t
                    );

                    await this.walletTransactionRepo.create(
                        {
                            walletId: wallet.id,
                            userId,
                            amount: yourUnclaimedReward,
                            type: WalletTransactionTypeEnum.EARNED,
                            eventType: WalletTransactionEventTypeEnum.REWARD_MILESTONE,
                            sourceId: rewardMilestoneSetting.id,
                            source: WalletTransactionSourceEnum.REWARD_MILESTONE,
                        },
                        t
                    );
                    await this.userAchievedThresholdsRepo.update(
                        { claimedAt: new Date() },
                        { where: { userId, id: userAchievedThreshold.id } }
                    );
                    await this.walletService.updateTotalAmountWallet({ userId, walletId: wallet.id }, t);
                }
            );
        } catch (error) {
            throw error;
        }
    }
}
