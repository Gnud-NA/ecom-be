import { InjectQueue } from "@nestjs/bull";
import { BadRequestException, Inject, Injectable, Logger, NotFoundException, Query } from "@nestjs/common";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import { CategoryFilter } from "@src/app/categories/dto/category.dto";
import Category from "@src/app/categories/entities/category.entity";
import { HelperService } from "@src/app/helper/helper.service";
import Menu from "@src/app/menu/entities/menu.entity";
import { MenuRepository } from "@src/app/menu/menu.repository";
import { PostCategory } from "@src/app/post-category/entities/post-category.entity";
import { FilterPostDto } from "@src/app/posts/dto/post.dto";
import Post from "@src/app/posts/entities/post.entity";
import { PostsRepository } from "@src/app/posts/posts.repository";
import { FilterSettingDto } from "@src/app/setting/dto/setting.dto";
import Setting from "@src/app/setting/entities/setting.entity";
import { SettingRepository } from "@src/app/setting/setting.repository";
import Slide from "@src/app/slides/entities/slide.entity";
import { SlidesRepository } from "@src/app/slides/slides.repository";
import User from "@src/app/users/entities/user.entity";
import { UserRepository } from "@src/app/users/users.repository";
import {
    ClaimRewardDto,
    FilterAllSlugDto,
    FilterDetailDto,
    FilterFindVoucherDto,
    FilterPostByCategorySlugDto,
    FilterProductByCategorySlugDto,
    FilterProductByCategoryWfcodeDto,
    FilterSearchProductDto,
    LockMembershipDto,
    SubcribeDto,
} from "@src/app/web-app/dto/web-app.dto";
import { IAllSlug, IDetails } from "@src/app/web-app/web-app.types";
import { BaseResponse, BaseService, BaseUpdatedResponse } from "@src/base";
import { DomainEnum, PostTypeEnum, VoucherDefaultEnum } from "@src/config";
import Color from "@src/ecom/color/entities/color.entity";
import { EcomCategoryRepository } from "@src/ecom/ecom-categories/ecom-categories.repository";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import RewardMilestoneSetting from "@src/ecom/reward-milestone-setting/entities/reward-milestone-setting.entity";
import Size from "@src/ecom/size/entities/size.entity";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { FilterMyPointDto } from "@src/ecom/user-reward-point/dto/user-reward-point.dto";
import UserRewardPoint from "@src/ecom/user-reward-point/entities/user-reward-point.entity";
import { UserRewardPointRepository } from "@src/ecom/user-reward-point/user-reward-point.repository";
import { VoucherRepository } from "@src/ecom/voucher/voucher.repository";
import { WalletTransactionRepository } from "@src/ecom/wallet-transaction/wallet-transaction.repository";
import Wallet from "@src/ecom/wallet/entities/wallet.entity";
import { WalletRepository } from "@src/ecom/wallet/wallet.repository";
import { WalletService } from "@src/ecom/wallet/wallet.service";
import { RedisCoreService } from "@src/redis-core/redis-core.service";
import { parseBoolean } from "@src/utils/ecom.util";
import { Queue } from "bull";
import { plainToInstance } from "class-transformer";
import { omit } from "lodash";
import { isArray, isNotNilOrEmpty } from "ramda-adjunct";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import slugify from "slugify";
import * as uuid from "uuid";
import {
    HandleError,
    convertFilterWithOrderBy,
    convertFilterWithWhere,
    insertIfObject,
} from "./../../utils/common.util";
import moment = require("moment");

@Injectable()
export class WebAppService extends BaseService<Wallet, WalletRepository> {
    constructor(
        @Inject(PostsRepository)
        private readonly postRepo: PostsRepository,
        @Inject(CategoryRepository)
        private readonly categoryRepo: CategoryRepository,
        @Inject(MenuRepository)
        private readonly menuRepo: MenuRepository,
        @Inject(SettingRepository)
        private readonly settingRepo: SettingRepository,
        @Inject(SlidesRepository)
        private readonly slideRepo: SlidesRepository,
        @Inject(VoucherRepository)
        private readonly voucherRepo: VoucherRepository,
        @Inject(ProductRepository)
        private readonly productRepo: ProductRepository,
        @Inject(EcomCategoryRepository)
        private readonly ecomCategoryRepo: EcomCategoryRepository,
        @Inject(RedisCoreService)
        private readonly redisCoreService: RedisCoreService,
        private helperService: HelperService,
        private readonly logger: Logger,
        private readonly userRepo: UserRepository,
        private readonly userRewardPointRepo: UserRewardPointRepository,
        private readonly walletRepo: WalletRepository,
        private readonly walletTransactionRepo: WalletTransactionRepository,
        private readonly walletService: WalletService,
        private readonly sequelize: Sequelize,
        @InjectQueue("claim-reward")
        private readonly rewardQueue: Queue
    ) {
        super(walletRepo);
    }

    async getMyPointHistories(userId: number, filter: FilterMyPointDto): Promise<BaseResponse<UserRewardPoint[]>> {
        try {
            const { count, data } = await this.userRewardPointRepo.findAndCount({
                ...convertFilterWithOrderBy(filter),
                where: {
                    ...convertFilterWithWhere(filter),
                    userId: userId,
                },
                include: [
                    {
                        model: RewardEvent,
                        as: "rewardEvent",
                    },
                ],
                attributes: ["id", "point", "createdAt", "metadata"],
            });

            return {
                count: count,
                data: data,
            };
        } catch (error) {
            throw error;
        }
    }

    async getMyMembershipInfo(userId: number): Promise<any> {
        try {
            const user = await this.userRepo.findOne({
                where: { id: userId },
                include: [{ model: Tier, as: "tier" }],
                attributes: ["id", "tierId"],
            });

            if (!user) {
                throw new NotFoundException("User not found");
            }

            const { yourUnclaimedReward, isClaimed, rewardMilestoneSetting, userRewardPoint } =
                await this.walletService.calculateYourUnclaimedReward({ userId });

            return {
                user: {
                    ...user,
                    id: Number(user?.id),
                },
                userRewardPoint,
                pointThreshold: plainToInstance(RewardMilestoneSetting, rewardMilestoneSetting),
                yourUnclaimedReward: Number(yourUnclaimedReward) || 0,
                isClaimed,
            };
        } catch (error) {
            throw error;
        }
    }

    async enqueueClaimReward(userId: number, data: ClaimRewardDto): Promise<BaseUpdatedResponse<any>> {
        try {
            await this.rewardQueue.removeJobs(`claim-reward-${userId}`);
            const job = await this.rewardQueue.add(
                "claim-reward",
                {
                    userId,
                    ...data,
                },
                {
                    jobId: `claim-reward-${userId}`,
                    removeOnComplete: false,
                    attempts: 2,
                    backoff: {
                        type: "exponential",
                        delay: 3000,
                    },
                }
            );
            return {
                status: "queued" as any,
                data: { message: "Add claim reward to queue successfully", jobId: job.id },
            };
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async getJobById(id: string) {
        try {
            const job = await this.rewardQueue.getJob(id);
            if (!job) {
                throw new NotFoundException("Job not found");
            }

            const state = await job.getState(); // 👈  'completed', 'failed', 'waiting', etc.
            const isFailed = state === "failed";
            const jobDetail = {
                id: job.id,
                name: job.name,
                data: job.data,
                state,
                progress: await job.progress(),
                failedReason: job.failedReason,
                returnValue: job.returnvalue,
                finishedOn: job.finishedOn,
                processedOn: job.processedOn,
            };
            return jobDetail;
        } catch (error) {
            throw error;
        }
    }

    async getSetting(@Query() request: FilterSettingDto): Promise<Partial<Setting>> {
        let setting = await this.settingRepo.getSettingByWeb({ where: { domain: request?.domain } });
        if (!setting) {
            setting = await this.settingRepo.create({ domain: request?.domain });
        }
        return setting;
    }

    async getDetail(slug: string, filter?: FilterDetailDto, requesterId?: number): Promise<IDetails> {
        let ecomCategory: EcomCategory;
        let products: Product[];
        let product: Product;
        let totalProducts: number = 0;
        let productRelations: Product[];

        let category: Category;
        let posts: Post[];
        let totalPosts: number = 0;
        let post: Post;
        let postRelations: Post[];

        ecomCategory = await this.ecomCategoryRepo.findBySlugAndBrandName(
            slug,
            filter?.brandName ?? filter?.where?.brandName ?? DomainEnum.REMEMBER_NGUYEN
        );
        if (ecomCategory) {
            // get by ecom category
            products = await this.productRepo.findByCategoryId(
                ecomCategory?.id,
                {
                    ...filter,
                },
                requesterId
            );
            totalProducts = await this.productRepo.countByCategoryId(ecomCategory?.id, { ...filter });
        } else if (!ecomCategory) {
            // get by product
            product = await this.productRepo.findBySlug(slug, requesterId);
            if (product && product?.ecomCategories?.[0]?.id) {
                productRelations = await this.productRepo.findByCategoryId(
                    product?.ecomCategories?.[0]?.id,
                    {
                        where: { id: { [Op.notIn]: [product.id] } },
                        limit: 10,
                    },
                    requesterId
                );
            }
        }

        if (!product && !ecomCategory) {
            category = await this.categoryRepo.findBySlug(slug);
            if (category) {
                // get by blog category
                posts = await this.postRepo.findByCategoryId(category?.id, { ...filter, postType: category.postType });
                totalPosts = await this.postRepo.countByCategoryId(category?.id, {
                    ...omit(filter, "brandName"),
                    postType: category.postType,
                });
            } else {
                post = await this.postRepo.findBySlug(slug);
                if (post?.categories?.[0]?.id) {
                    postRelations = await this.postRepo.findByCategoryId(post?.categories?.[0]?.id, {
                        postType: post?.postType,
                        where: { id: { [Op.notIn]: [post.id] } },
                        limit: 10,
                    });
                }
            }
        }

        return {
            ...insertIfObject(
                isNotNilOrEmpty(ecomCategory),
                { ecomCategory, products, totalProducts },
                { ecomCategory: null }
            ),
            ...insertIfObject(product, { product, postRelations }, { post: null }),
            ...insertIfObject(
                post?.postType !== PostTypeEnum.CONTACT && post?.postType !== PostTypeEnum.PAGE,
                { post, postRelations },
                { post: null }
            ),
            ...insertIfObject(post?.postType === PostTypeEnum.PAGE, { page: post }, { page: null }),
            ...insertIfObject(isNotNilOrEmpty(category), { category, posts: posts, totalPosts }, { category: null }),
        };
    }

    async getAllSlug(filter: FilterAllSlugDto): Promise<IAllSlug> {
        const [ecomCategories, products, categories, posts] = await Promise.all([
            this.ecomCategoryRepo.find({
                where: { slug: { [Op.ne]: null }, status: true, deletedAt: null, brandName: filter.brandName },
                attributes: ["slug"],
            }),
            this.productRepo.findWithActive({
                where: { slug: { [Op.ne]: null }, status: true, deletedAt: null, brandName: filter.brandName },
                attributes: ["slug"],
            }),
            this.categoryRepo.find({
                where: { slug: { [Op.ne]: null }, status: true, deletedAt: null },
                attributes: ["slug"],
            }),
            this.postRepo.findWithActive({
                where: { slug: { [Op.ne]: null }, status: true, deletedAt: null },
                attributes: ["slug"],
            }),
        ]);

        return {
            ecomCategories,
            products,
            posts,
            categories,
        };
    }

    async getListCategoriesByPostType(postType: PostTypeEnum, filter: CategoryFilter): Promise<Category[]> {
        const category = await this.categoryRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                postType: postType,
            },
            include: [
                {
                    model: PostCategory,
                    subQuery: false,
                    limit: filter?.limit,
                    include: [
                        {
                            association: "post",
                            where: {
                                status: true,
                            },
                        },
                    ],
                },
                "childs",
            ],
        });
        return category;
    }

    async getListCategoriesByWfCode(wfCode: string, filter: CategoryFilter): Promise<Category[]> {
        const category = await this.categoryRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                wfCode,
            },
            include: [
                {
                    model: PostCategory,
                    subQuery: false,
                    limit: filter?.limit,
                    include: [
                        {
                            association: "post",
                            where: {
                                status: true,
                            },
                        },
                    ],
                },
                {
                    association: "childs",
                    order: [["priority", "ASC"]],
                    separate: true,
                    include: [{ association: "childs", order: [["priority", "ASC"]], separate: true }],
                },
            ],
        });
        return category;
    }

    async getPostsByCategorySlug(slug: string, filter: FilterPostByCategorySlugDto): Promise<BaseResponse> {
        const category: Category = await this.categoryRepo.findBySlug(slug);
        let posts: Post[] = [];
        let count: number = 0;
        if (category) {
            count = await this.postRepo.countByCategoryId(category?.id, filter);
            posts = await this.postRepo.findByCategoryId(category?.id, filter);
        }
        return {
            count,
            data: {
                posts: posts,
                category: category,
            },
        };
    }

    async getPostsByCategoryId(id: number, filter: FilterPostByCategorySlugDto): Promise<BaseResponse> {
        const category: Category = await this.categoryRepo.findOne({ where: { id } });
        let posts: Post[] = [];
        let count: number = 0;
        if (category) {
            count = await this.postRepo.countByCategoryId(category?.id, filter);
            posts = await this.postRepo.findByCategoryId(category?.id, filter);
        }
        return {
            count,
            data: {
                posts: posts,
                category: category,
            },
        };
    }

    async getListPostsByPostType(postType: PostTypeEnum, filter: FilterPostDto): Promise<Post[]> {
        const post = await this.postRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                postType,
                status: filter.where?.status ?? true,
            },
            order: [["id", "DESC"]],
            include: ["categories"],
        });

        return post;
    }

    async getListPostsByPostTypeV2(postType: PostTypeEnum, filter: FilterPostDto): Promise<BaseResponse<Post[]>> {
        try {
            const post = await this.postRepo.find({
                ...convertFilterWithOrderBy(filter),
                where: {
                    ...filter?.where,
                    postType,
                    status: filter.where?.status ?? true,
                    ...insertIfObject(filter?.contactType, { contactType: filter.contactType }),
                },
                order: [["id", "DESC"]],
                include: ["categories"],
            });
            return {
                count: post.length,
                data: post,
            };
        } catch (error) {
            this.logger.error("getListPostsByPostTypeV2", error);
            return {
                count: 0,
                data: [],
            };
        }
    }

    async getMenuByCode(wfCode: string): Promise<Menu> {
        const menu = await this.menuRepo.findOne({
            where: {
                wfCode,
            },
            order: [["id", "DESC"]],
            include: [{ association: "menuDetails", separate: true, order: [["priority", "ASC"]] }],
        });

        return menu;
    }

    async getSlideByCode(wfCode: string): Promise<Slide> {
        const slide = await this.slideRepo.findOne({
            where: {
                wfCode,
            },
            include: [
                {
                    association: "slideDetails",
                    order: [["order", "ASC"]],
                    include: [{ association: "menu", include: ["menuDetails"] }],
                },
            ],
        });

        return slide;
    }

    async getPartnerHomePage(): Promise<(Category | { posts: Post[] })[]> {
        const categories: Category[] = await this.categoryRepo.find({
            where: { postType: PostTypeEnum.PARTNER },
            attributes: [
                "id",
                "name",
                "slug",
                "description",
                "content",
                "icon",
                "image",
                "wfCode",
                "status",
                "parentId",
                "priority",
                "userId",
                "createdAt",
                "deletedAt",
                "updatedAt",
            ],
        });

        if (categories) {
            const result = await Promise.all(
                categories?.map(async (item) => {
                    const posts = await this.postRepo.findByCategoryId(item?.id, {
                        limit: 10,
                        postType: PostTypeEnum.PARTNER,
                    });
                    return { ...item.dataValues, posts };
                })
            );
            // count = await this.postRepo.countByCategoryId(category?.id, filter);
            // posts = await this.postRepo.findByCategoryId(category?.id, filter);
            return [...result];
        }
        return [];
    }

    async postContact(data: Partial<Post>): Promise<Partial<Post>> {
        let contact = await this.postRepo.create(data);

        try {
            await this.helperService.sendContactNotificationEmail(contact);
        } catch (error) {
            this.logger.error(
                "ContactNotification",
                `Failed to send contact notification email for contact ID: ${contact.id}`,
                error
            );
            // Don't throw error as contact was created successfully
        }

        return contact;
    }

    async postContactQna(data: Partial<Post>): Promise<Partial<Post>> {
        const newUUID = uuid.v4();
        let contact = await this.postRepo.create({ ...data, slug: slugify(newUUID, { lower: true }) });

        try {
            await this.helperService.sendContactNotificationEmail(contact);
        } catch (error) {
            this.logger.error(
                "ContactNotification",
                `Failed to send contact notification email for contact ID: ${contact.id}`,
                error
            );
            // Don't throw error as contact was created successfully
        }

        return contact;
    }

    async subcribeContact(data: Partial<SubcribeDto>): Promise<Partial<Post>> {
        const lastContact = await this.postRepo.findOne({ where: { email: data.email }, orderBy: [["id", "DESC"]] });

        if (!lastContact || !this.helperService.isCodeSentWithin5Minutes(lastContact.subcribeDate)) {
            if (data.email) {
                const voucher = await this.voucherRepo.findOne({ where: { code: VoucherDefaultEnum.REMEMBER_NGUYEN } });
                await this.helperService.sendEmailSubcribe(data.email, voucher.code);
            }
            let contact = await this.postRepo.create({
                ...data,
                subcribeDate: moment().toISOString(),
                status: true,
                postType: PostTypeEnum.CONTACT,
            });
            return contact;
        }
        // return null;
        HandleError("test", 419);
    }

    async getProductByCategorySlug(slug: string, filter: FilterProductByCategorySlugDto): Promise<BaseResponse> {
        // const { wfCode } = filter;
        const ecomCategory: EcomCategory = await this.ecomCategoryRepo.findOne({ where: { slug } });
        let products: Product[] = [];
        let count: number = 0;
        if (ecomCategory) {
            count = await this.productRepo.countByCategoryId(ecomCategory?.id, filter);
            products = await this.productRepo.findByCategoryId(ecomCategory?.id, filter);
        }
        return {
            count,
            data: {
                products,
                ecomCategory,
            },
        };
    }

    async getProductByCategoryWfcode(filter: FilterProductByCategoryWfcodeDto): Promise<BaseResponse> {
        const { wfCode } = filter;
        const ecomCategory: EcomCategory = await this.ecomCategoryRepo.findOne({ where: { wfCode } });
        let products: Product[] = [];
        let count: number = 0;
        if (ecomCategory) {
            count = await this.productRepo.countByCategoryId(ecomCategory?.id, filter);
            products = await this.productRepo.findByCategoryId(ecomCategory?.id, filter);
        }
        return {
            count,
            data: {
                products,
                ecomCategory,
            },
        };
    }

    async getVourches(filter: FilterFindVoucherDto) {
        const vourcher = await this.voucherRepo.findOne({ where: { code: filter.code } });
        if (vourcher) {
            return vourcher;
        }
        return null;
    }

    async searchProduct(filter?: FilterSearchProductDto, requesterId?: number): Promise<BaseResponse<Product[]>> {
        const isHasColor = parseBoolean(filter?.isHasColor);
        const isHasSize = parseBoolean(filter?.isHasSize);
        const data = await this.productRepo.findAndCount({
            ...{ order: [["createdAt", "DESC"]] },
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
                ...insertIfObject(filter?.search, {
                    [Op.or]: [
                        { productName: { [Op.like]: `%${filter?.search}%` } },
                        { description: { [Op.like]: `%${filter?.search}%` } },
                        { slug: { [Op.like]: `%${filter?.search}%` } },
                        { tags: { [Op.like]: `%${filter?.search}%` } },
                    ],
                }),
                ...insertIfObject(filter?.minPrice || filter?.maxPrice, {
                    [Op.and]: [
                        { ...insertIfObject(filter?.minPrice, { showPrice: { [Op.gte]: filter?.minPrice } }) },
                        { ...insertIfObject(filter?.maxPrice, { showPrice: { [Op.lte]: filter?.maxPrice } }) },
                    ],
                }),
                ...insertIfObject(filter?.brandName, {
                    brandName: filter.brandName,
                }),
            },
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) > 0
                            FROM ecom_favorites AS f
                            WHERE f.product_id = "Product"."id" AND f.user_id = ${Number(requesterId) || 0}
                        )`),
                        "isFavorite",
                    ],
                ],
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                {
                    model: EcomCategory,
                    ...insertIfObject(filter?.categoryId, { required: true, where: { id: filter?.categoryId } }),
                },
                ...(insertIfObject(
                    filter?.colorIds,
                    [
                        {
                            model: Color,
                            as: "colors",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.colorIds) ? filter?.colorIds : [filter?.colorIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                ...(insertIfObject(
                    filter?.sizeIds,
                    [
                        {
                            model: Size,
                            as: "sizes",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.sizeIds) ? filter?.sizeIds : [filter?.sizeIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                "media",
                "galleries",
                {
                    model: ProductColor,
                    as: "productColors",
                    required: isHasColor === true,
                    include: [
                        {
                            model: Color,
                            as: "color",
                            required: false,
                            where: {
                                deletedAt: null,
                            },
                        },
                    ],
                    where: {
                        deletedAt: null,
                    },
                },
                {
                    model: ProductSize,
                    as: "productSizes",
                    required: isHasSize === true,
                    include: [{ model: Size, as: "size", required: false, where: { deletedAt: null } }],
                    where: {
                        deletedAt: null,
                    },
                },
            ],
        });

        return data;
    }

    async lockMembership(userId: number, data: LockMembershipDto): Promise<BaseUpdatedResponse> {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException("User not found");
            }
            await this.userRepo.update(data, { where: { id: userId } });
            const userUpdated = await this.userRepo.findOne({
                where: { id: userId },
                attributes: ["id", "membershipActive", "reasonMembershipLock"],
            });

            return {
                status: true,
                data: userUpdated,
            };
        } catch (error) {
            throw error;
        }
    }
}
