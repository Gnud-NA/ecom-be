import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseDeletedResponse, BaseResponse } from "@src/base";
import { StripeService } from "@src/ecom/payment/stripe.service";
import { UserBankCardFilter } from "@src/ecom/user-bank-card/dto/user-bank-card.dto";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { CreateUserBankCardDto } from "./dto/create-user-bank-card.dto";
import { UserBankCard } from "./entities/user-bank-card.entity";
import { UserBankCardRepository } from "./user-bank-card.repository";

@Injectable()
export class UserBankCardService {
    constructor(private userBankCardRepo: UserBankCardRepository, private stripeService: StripeService) {}

    async create(createUserBankCardDto: CreateUserBankCardDto, userId: number): Promise<UserBankCard> {
        const userBankCard = await this.userBankCardRepo.findOne({
            where: {
                paymentMethodId: createUserBankCardDto.paymentMethodId,
                userId,
            },
        });
        if (userBankCard) {
            throw new BadRequestException("User bank card already exists");
        }
        const userBankCardDefault = await this.userBankCardRepo.findOne({
            where: {
                userId,
                isDefault: true,
            },
        });
        const isDefault = userBankCardDefault ? false : true;
        const newUserBankCard = await this.userBankCardRepo.create({
            ...createUserBankCardDto,
            isDefault,
            userId,
        });
        return newUserBankCard;
    }

    async setDefault(id: number, userId: number) {
        const userBankCard = await this.userBankCardRepo.findById(id);
        if (!userBankCard || Number(userBankCard?.dataValues?.userId) !== Number(userId)) {
            throw new NotFoundException("User bank card not found");
        }
        await this.userBankCardRepo.updateWhere({ isDefault: false }, { where: { userId, isDefault: true } });
        const updatedUserBankCard = await this.userBankCardRepo.updateById(id, { isDefault: true });

        return updatedUserBankCard;
    }

    async findAll(filter?: UserBankCardFilter, userId?: number): Promise<BaseResponse<UserBankCard[]>> {
        const { count, data } = await this.userBankCardRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
                userId,
            },
        });

        return { count, data: plainToInstance(UserBankCard, data) };
    }

    async findOne(id: number, requesterId: number): Promise<UserBankCard> {
        const userBankCard = await this.userBankCardRepo.findOne({ where: { id, userId: requesterId } });
        if (!userBankCard) {
            throw new NotFoundException("User bank card not found");
        }
        return plainToInstance(UserBankCard, userBankCard);
    }

    async autoSetDefault(userId: number) {
        try {
            const userBankCards = await this.userBankCardRepo.find({
                where: { userId },
                order: [["createdAt", "DESC"]],
            });

            if (!userBankCards.length) {
                return;
            }

            if (userBankCards.length === 1) {
                if (userBankCards[0].isDefault) {
                    return;
                }
                await this.userBankCardRepo.update({ isDefault: true }, { where: { id: userBankCards[0].id } });
                return;
            }

            const userBankCardDefault = await this.userBankCardRepo.findOne({ where: { userId, isDefault: true } });
            if (userBankCardDefault) {
                return;
            }

            await this.userBankCardRepo.update({ isDefault: true }, { where: { id: userBankCards[0].id } });
            return;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number, requesterId: number): Promise<BaseDeletedResponse> {
        try {
            const userBankCard = await this.userBankCardRepo.findById(id);
            if (!userBankCard || Number(userBankCard?.dataValues?.userId) !== Number(requesterId)) {
                throw new NotFoundException("User bank card not found");
            }
            await userBankCard.destroy();
            await this.autoSetDefault(requesterId);
            // not await this because it will be deleted or not exist from stripe
            this.stripeService.deletePaymentMethod(userBankCard.paymentMethodId);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
