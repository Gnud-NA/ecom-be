import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseDeletedResponse, BaseResponse } from "@src/base";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { FavoritesFilter } from "@src/ecom/favorites/dto/favorites.dto";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { CreateFavoritesDto } from "./dto/create-favorites.dto";
import Favorites from "./entities/favorites.entity";
import { FavoritesRepository } from "./favorites.repository";

@Injectable()
export class FavoritesService {
    constructor(private favoritesRepo: FavoritesRepository, private productRepo: ProductRepository) {}

    async create(createFavoritesDto: CreateFavoritesDto, userId: number): Promise<Favorites> {
        const curenntFavorites = await this.favoritesRepo.findOne({
            where: {
                userId,
                productId: createFavoritesDto.productId,
            },
        });
        if (curenntFavorites) {
            throw new BadRequestException("Product already in favorites");
        }
        const favorites = await this.favoritesRepo.create({ ...createFavoritesDto, userId });
        return favorites;
    }

    async findAll(filter?: FavoritesFilter, userId?: number): Promise<BaseResponse<Favorites[]>> {
        try {
            const { count, data } = await this.favoritesRepo.findAndCount({
                ...convertFilterWithOrderBy(filter),
                where: {
                    ...convertFilterWithWhere(filter),
                    userId,
                },
                include: [
                    {
                        model: Product,
                        as: "product",
                        where: {
                            ...(!!filter.brandName && { brandName: filter.brandName }),
                        },
                        include: [
                            {
                                model: EcomCategory,
                                as: "ecomCategories",
                                where: {
                                    ...(filter.categoryId && { id: Number(filter.categoryId) }),
                                },
                            },
                        ],
                    },
                ],
            });

            return { count, data };
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number, requesterId: number): Promise<BaseDeletedResponse> {
        const favorites = await this.favoritesRepo.findById(id);
        if (!favorites || Number(favorites?.dataValues?.userId) !== Number(requesterId)) {
            throw new BadRequestException("Favorites not found");
        }
        await favorites.destroy();
        return { status: true };
    }
}
