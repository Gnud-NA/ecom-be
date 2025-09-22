import { Injectable } from "@nestjs/common";
import { CreateUserAchievedThresholdsDto } from "@src/ecom/user-achieved-thresholds/dto/create-user-achieved-thresholds.dto";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { Transaction } from "sequelize";

@Injectable()
export class UserAchievedThresholdsService {
    constructor(private readonly userAchievedThresholdsRepo: UserAchievedThresholdsRepository) {}

    async createNew(createUserAchievedThresholdsDto: CreateUserAchievedThresholdsDto, transaction?: Transaction) {
        try {
            const userAchievedThresholds = await this.userAchievedThresholdsRepo.create(
                {
                    ...createUserAchievedThresholdsDto,
                },
                transaction
            );

            return await this.userAchievedThresholdsRepo.findOne(
                {
                    where: {
                        id: userAchievedThresholds.id,
                    },
                },
                transaction
            );
        } catch (error) {
            throw error;
        }
    }

    async getOne(userId: number, transaction?: Transaction) {
        try {
            const userAchievedThreshold = await this.userAchievedThresholdsRepo.findOne(
                {
                    where: {
                        userId,
                        deletedAt: null,
                    },
                    attributes: ["id", "userId", "amount", "createdAt", "deletedAt", "claimedAt"],
                    order: [["createdAt", "ASC"]],
                },
                transaction
            );

            return userAchievedThreshold;
        } catch (error) {
            throw error;
        }
    }
}
