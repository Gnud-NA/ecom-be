import { Injectable, NotFoundException } from "@nestjs/common";
import { EcomWalletTypeEnum, RewardMilestoneStatusEnum, WalletTransactionTypeEnum } from "@src/config";
import { RewardMilestoneSettingRepository } from "@src/ecom/reward-milestone-setting/reward-milestone-setting.repository";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { UserAchievedThresholdsService } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.service";
import { UserRewardPointRepository } from "@src/ecom/user-reward-point/user-reward-point.repository";
import { WalletTransactionRepository } from "@src/ecom/wallet-transaction/wallet-transaction.repository";
import { Transaction } from "sequelize";
import { WalletRepository } from "./wallet.repository";

@Injectable()
export class WalletService {
    constructor(
        private walletRepo: WalletRepository,
        private readonly userRewardPointRepo: UserRewardPointRepository,
        private readonly rewardMilestoneSettingsRepo: RewardMilestoneSettingRepository,
        private readonly walletTransactionRepo: WalletTransactionRepository,
        private readonly userAchievedThresholdsRepo: UserAchievedThresholdsRepository,
        private readonly userAchievedThresholdsService: UserAchievedThresholdsService
    ) {}

    async calculateYourUnclaimedReward({ userId }: { userId: number }, transaction?: Transaction) {
        try {
            const userRewardPoint =
                (await this.userRewardPointRepo.sum("point", { where: { userId } }, transaction)) ?? 0;

            const rewardMilestoneSetting = await this.rewardMilestoneSettingsRepo.findOne({
                order: [["priority", "ASC"]],
                where: {
                    status: RewardMilestoneStatusEnum.ACTIVE,
                    deletedAt: null,
                },
                transaction,
            });

            if (!rewardMilestoneSetting) {
                throw new NotFoundException("Reward not trigger in system");
            }

            const userAchievedThreshold = await this.userAchievedThresholdsService.getOne(userId, transaction);

            let yourUnclaimedReward = 0;
            if (userAchievedThreshold && !userAchievedThreshold.claimedAt) {
                yourUnclaimedReward = userAchievedThreshold.amount;
            }
            return {
                yourUnclaimedReward,
                rewardMilestoneSetting,
                userRewardPoint,
                isClaimed: !!userAchievedThreshold && !userAchievedThreshold?.claimedAt,
                userAchievedThreshold,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateTotalAmountWallet(
        { userId, walletId }: { userId: number; walletId: number },
        transaction?: Transaction
    ) {
        try {
            const totalEarned = await this.walletTransactionRepo.sum("amount", {
                where: {
                    userId,
                    walletId,
                    deletedAt: null,
                    type: WalletTransactionTypeEnum.EARNED,
                },
                transaction,
            });

            const totalSpent = await this.walletTransactionRepo.sum("amount", {
                where: {
                    userId,
                    walletId,
                    deletedAt: null,
                    type: WalletTransactionTypeEnum.SPENT,
                },
                transaction,
            });

            const balance = Number(totalEarned) - Number(totalSpent);

            await this.walletRepo.update({ totalAmount: balance }, { where: { id: walletId } }, transaction);
        } catch (error) {
            throw error;
        }
    }

    async getWallet(
        { userId, walletType }: { userId: number; walletType: EcomWalletTypeEnum },
        transaction?: Transaction
    ) {
        try {
            let wallet = await this.walletRepo.findOne({ where: { userId }, transaction });

            if (!wallet) {
                wallet = await this.walletRepo.create(
                    {
                        userId,
                        type: walletType,
                        totalAmount: 0,
                    },
                    transaction
                );
            }

            return wallet;
        } catch (error) {
            throw error;
        }
    }
}
