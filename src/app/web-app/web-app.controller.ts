import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { CategoryFilter } from "@src/app/categories/dto/category.dto";
import { FilterSettingDto } from "@src/app/setting/dto/setting.dto";
import {
    ClaimRewardDto,
    CreateContactPostDto,
    CreateContactQnaPostDto,
    FilterAllSlugDto,
    FilterDetailDto,
    FilterFindVoucherDto,
    FilterPostByCategorySlugDto,
    FilterPostListByPostTypeDto,
    FilterProductByCategorySlugDto,
    FilterProductByCategoryWfcodeDto,
    FilterSearchProductDto,
    LockMembershipDto,
    SubcribeDto,
} from "@src/app/web-app/dto/web-app.dto";
import { RequestWithAuth } from "@src/base";
import { ContactTypeEnum, PostTypeEnum } from "@src/config";
import { FilterMyPointDto } from "@src/ecom/user-reward-point/dto/user-reward-point.dto";
import { WebAppService } from "./web-app.service";

@Controller("web-app")
@ApiTags("Web APP")
export class WebAppController {
    constructor(private readonly webAppService: WebAppService) {}

    @Get("settings")
    getSetting(@Query() request: FilterSettingDto) {
        return this.webAppService.getSetting(request);
    }

    @Get("details/:slug")
    getDetail(@Param("slug") slug: string, @Query() filter?: FilterDetailDto, @Req() req?: RequestWithAuth) {
        const userId = filter?.userId;
        return this.webAppService.getDetail(slug, filter, userId);
    }

    @Get("all-slug")
    getAllSlug(@Query() filter?: FilterAllSlugDto) {
        return this.webAppService.getAllSlug(filter);
    }

    @Get("category/:postType/lists")
    getListCategoriesByPostType(@Param("postType") postType: PostTypeEnum, @Query() filter: CategoryFilter) {
        return this.webAppService.getListCategoriesByPostType(postType, filter);
    }

    @Get("category-by-wf-code/:wfCode/lists")
    getListCategoriesByWfCode(@Param("wfCode") wfCode: PostTypeEnum, @Query() filter: CategoryFilter) {
        return this.webAppService.getListCategoriesByWfCode(wfCode, filter);
    }

    @Get("posts/lists")
    getListPostsByPostType(@Query() filter: FilterPostListByPostTypeDto) {
        return this.webAppService.getListPostsByPostType(filter?.postType, filter);
    }
    @Get("v2/posts/lists")
    getListPostsByPostTypeV2(@Query() filter: FilterPostListByPostTypeDto) {
        return this.webAppService.getListPostsByPostTypeV2(filter?.postType, filter);
    }

    @Get("posts/by-category-slug/:slug")
    getPostsByCategorySlug(@Param("slug") slug: string, @Query() filter: FilterPostByCategorySlugDto) {
        return this.webAppService.getPostsByCategorySlug(slug, filter);
    }

    @Get("posts/by-category-id/:id")
    getPostsByCategoryId(@Param("id") id: number, @Query() filter: FilterPostByCategorySlugDto) {
        return this.webAppService.getPostsByCategoryId(id, filter);
    }

    @Get("menu/:wfCode")
    getMenuByCode(@Param("wfCode") wfCode: string) {
        return this.webAppService.getMenuByCode(wfCode);
    }

    @Get("slides/:wfCode")
    getSlideById(@Param("wfCode") wfCode: string) {
        return this.webAppService.getSlideByCode(wfCode);
    }

    @Get("partner-home")
    getPartnerHomePage() {
        return this.webAppService.getPartnerHomePage();
    }

    @Post("contact")
    postContact(@Body() data: CreateContactPostDto) {
        return this.webAppService.postContact({ ...data, status: true, postType: PostTypeEnum.CONTACT });
    }

    @Post("qna")
    postQna(@Body() data: CreateContactQnaPostDto) {
        return this.webAppService.postContactQna({
            ...data,
            status: true,
            postType: PostTypeEnum.CONTACT,
            contactType: ContactTypeEnum.QNA,
        });
    }

    @Post("subcribe")
    subcribe(@Body() data: SubcribeDto) {
        return this.webAppService.subcribeContact(data);
    }

    @Get("ecom/products/by-category-slug/:slug")
    getProductByCategorySlug(@Param("slug") slug: string, @Query() filter: FilterProductByCategorySlugDto) {
        return this.webAppService.getProductByCategorySlug(slug, filter);
    }
    @Get("ecom/products/by-category-wfcode")
    getProductByCategoryWfcode(@Query() filter: FilterProductByCategoryWfcodeDto) {
        return this.webAppService.getProductByCategoryWfcode(filter);
    }

    @Get("ecom/vourchers/get-by-code")
    getVourches(@Query() filter: FilterFindVoucherDto) {
        return this.webAppService.getVourches(filter);
    }

    @Get("ecom/product/search")
    searchProduct(@Query() filter: FilterSearchProductDto, @Req() req?: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.webAppService.searchProduct(filter, userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get("ecom/my-membership-info")
    getMyMembershipInfo(@Req() req?: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.webAppService.getMyMembershipInfo(userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post("ecom/claim-reward")
    claimReward(@Body() data: ClaimRewardDto, @Req() req?: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.webAppService.enqueueClaimReward(userId, data);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get("ecom/queue-job/:id")
    getJobById(@Param("id") id: string) {
        return this.webAppService.getJobById(id);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get("ecom/my-point-histories")
    getMyPointHistories(@Query() filter: FilterMyPointDto, @Req() req?: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.webAppService.getMyPointHistories(userId, filter);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Patch("ecom/membership/lock")
    lockMembership(@Body() data: LockMembershipDto, @Req() req?: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.webAppService.lockMembership(userId, data);
    }
}
