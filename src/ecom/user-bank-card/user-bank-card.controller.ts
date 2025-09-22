import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseDeletedResponse, BaseResponse, RequestWithAuth } from "@src/base";
import { CreateUserBankCardDto } from "@src/ecom/user-bank-card/dto/create-user-bank-card.dto";
import { UserBankCardFilter } from "@src/ecom/user-bank-card/dto/user-bank-card.dto";
import UserBankCard from "@src/ecom/user-bank-card/entities/user-bank-card.entity";
import { UserBankCardService } from "@src/ecom/user-bank-card/user-bank-card.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/my-bank-card")
@ApiTags("My Bank Card")
@ApiBearerAuth()
@UseGuards(UserGuard)
@UseInterceptors(ContextInterceptor)
export class UserBankCardController {
    constructor(private readonly userBankCardService: UserBankCardService) {}

    @Post()
    create(@Body() createUserBankCardDto: CreateUserBankCardDto, @Req() req: RequestWithAuth) {
        return this.userBankCardService.create(createUserBankCardDto, req.auth.userId);
    }

    @Post("/:id/set-default")
    setDefault(@Param("id") id: string, @Req() req: RequestWithAuth) {
        return this.userBankCardService.setDefault(+id, req.auth.userId);
    }

    @ApiOkResponse({
        description: "The Post records of user bank card",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(UserBankCard),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Req() req: RequestWithAuth, @Query() request: UserBankCardFilter): Promise<BaseResponse<UserBankCard[]>> {
        return this.userBankCardService.findAll(request, req.auth.userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Req() req: RequestWithAuth) {
        return this.userBankCardService.findOne(+id, req.auth.userId);
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
        return this.userBankCardService.delete(+id, req.auth.userId);
    }
}
