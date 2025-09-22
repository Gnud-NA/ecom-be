import { Inject, Injectable } from "@nestjs/common";
import { MediaRepository } from "@src/app/media/media.repository";
import { CreateSlideDetailDto } from "@src/app/slide-details/dto/create-slide-detail.dto";
import { SlideDetailFilter } from "@src/app/slide-details/dto/slide-detail.dto";
import { UpdateSlideDetailDto } from "@src/app/slide-details/dto/update-slide-detail.dto";
import SlideDetail from "@src/app/slide-details/entities/slide-detail.entity";
import { SlideDetailsRepository } from "@src/app/slide-details/slide-details.repository";
import { BaseService } from "@src/base";
import { MediaAbleTypeEnum } from "@src/config";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import { Op } from "sequelize";

@Injectable()
export class SlideDetailsService extends BaseService<SlideDetail, SlideDetailsRepository> {
    constructor(
        private readonly slideDetilRepo: SlideDetailsRepository,
        @Inject(MediaRepository)
        private readonly mediaRepository: MediaRepository
    ) {
        super(slideDetilRepo);
    }

    async create(createSlideDetailsDto: CreateSlideDetailDto) {
        const maxOrder = await this.slideDetilRepo.getMaxByField("order");
        const slideDetail = await this.slideDetilRepo.create({ ...createSlideDetailsDto, order: maxOrder });
        if (slideDetail && slideDetail?.image) {
            this.mediaRepository.updateByName(slideDetail.image, {
                mediaableId: slideDetail.id,
                mediaableType: MediaAbleTypeEnum.SLIDE,
            });
        }
        if (slideDetail && slideDetail?.background) {
            this.mediaRepository.updateByName(slideDetail.background, {
                mediaableId: slideDetail.id,
                mediaableType: MediaAbleTypeEnum.SLIDE,
            });
        }
        return this.findOne(slideDetail.id);
    }

    async findAll(filter?: SlideDetailFilter) {
        return await this.slideDetilRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                ...insertIfObject(!!filter?.where?.slideId, { slideId: { [Op.eq]: filter?.where?.slideId } }),
                ...insertIfObject(!!filter?.slideId, { slideId: { [Op.eq]: filter?.slideId } }),
            },
            include: [{ association: "slide" }],
        });
    }

    async update(id: number, updateCategoryDto: UpdateSlideDetailDto) {
        await this.slideDetilRepo.updateById(id, updateCategoryDto);
        return this.findOne(id);
    }
}
