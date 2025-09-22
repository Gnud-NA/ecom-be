import { Inject, Injectable } from "@nestjs/common";
import Category from "@src/app/categories/entities/category.entity";
import { MediaRepository } from "@src/app/media/media.repository";
import { CreatePostDto } from "@src/app/posts/dto/create-post.dto";
import { FilterPostDto } from "@src/app/posts/dto/post.dto";
import Post from "@src/app/posts/entities/post.entity";
import { PostsRepository } from "@src/app/posts/posts.repository";
import User from "@src/app/users/entities/user.entity";
import { BaseResponse, BaseService } from "@src/base";
import { MediaAbleTypeEnum, PostTypeEnum } from "@src/config";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import { omit } from "lodash";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService extends BaseService<Post, PostsRepository> {
    constructor(
        @Inject(PostsRepository)
        private readonly postRepository: PostsRepository,
        private sequelize: Sequelize,
        @Inject(MediaRepository)
        private readonly mediaRepository: MediaRepository
    ) {
        super(postRepository);
    }

    async create(createPostDto: CreatePostDto) {
        const post = await this.sequelize.transaction(async (t) => {
            const post = await this.postRepository.create({ ...omit(createPostDto, ["mediaId"]) });
            await post.$set("categories", createPostDto?.categoryIds ?? []);
            if (createPostDto?.userId) {
                await post.$set("user", createPostDto?.userId);
            }
            if (post && createPostDto?.mediaId) {
                this.mediaRepository.updateById(createPostDto.mediaId, {
                    mediaableId: post.id,
                    mediaableType: MediaAbleTypeEnum.POST,
                });
            }
            return post;
        });
        return await this.findOne(post.id);
    }

    async findAll(filter?: FilterPostDto): Promise<BaseResponse<Post[]>> {
        const posts = await this.postRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                postType: filter?.postType,
                ...insertIfObject(filter?.contactType, { contactType: filter?.contactType }),
                ...insertIfObject(filter?.search, {
                    [Op.or]: [
                        { title: { [Op.like]: `%${filter?.search}%` } },
                        { description: { [Op.like]: `%${filter?.search}%` } },
                        { slug: { [Op.like]: `%${filter?.search}%` } },
                        { tags: { [Op.like]: `%${filter?.search}%` } },
                        insertIfObject(filter?.postType === PostTypeEnum.CONTACT, {
                            email: { [Op.like]: `%${filter?.search}%` },
                            phone: { [Op.like]: `%${filter?.search}%` },
                        }),
                    ],
                }),
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                {
                    model: Category,
                    ...insertIfObject(filter?.categoryId, { required: true, where: { id: filter?.categoryId } }),
                },
            ],
        });
        const count = await this.postRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter?.where,
                postType: filter?.postType,
                ...insertIfObject(filter?.contactType, { contactType: filter?.contactType }),
                ...insertIfObject(filter?.search, {
                    [Op.or]: [
                        { title: { [Op.like]: `%${filter?.search}%` } },
                        { description: { [Op.like]: `%${filter?.search}%` } },
                        { slug: { [Op.like]: `%${filter?.search}%` } },
                        { tags: { [Op.like]: `%${filter?.search}%` } },
                        insertIfObject(filter?.postType === PostTypeEnum.CONTACT, {
                            email: { [Op.like]: `%${filter?.search}%` },
                            phone: { [Op.like]: `%${filter?.search}%` },
                        }),
                    ],
                }),
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                {
                    model: Category,
                    ...insertIfObject(filter?.categoryId, { required: true, where: { id: filter?.categoryId } }),
                },
            ],
        });
        return {
            count,
            data: posts,
        };
    }

    async findOne(id: number) {
        return this.postRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: ["id", "email", "username"] }, { model: Category }],
        });
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        const res = await this.sequelize.transaction(async (t) => {
            await this.postRepository.updateByIdWithBase(id, updatePostDto);
            const post = await this.postRepository.findById(id);
            await post.$set("categories", updatePostDto?.categoryIds ?? []);
            if (updatePostDto?.userId) {
                await post.$set("user", updatePostDto?.userId);
            }
            if (updatePostDto?.deleteCategoryIds) {
                await post.$remove("categories", updatePostDto?.deleteCategoryIds);
            }
            return post;
        });
        return this.findOne(res.id);
    }

    remove(id: number) {
        return this.delete(id);
    }
}
