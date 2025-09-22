import { Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { UserFilter } from "@src/app/users/dto/user.dto";
import User from "@src/app/users/entities/user.entity";
import { BaseResponse } from "@src/base";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // @ApiTags("users")
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    @Get()
    @UseGuards(AdminGuard)
    findAllAdmin(@Query() request: UserFilter): Promise<BaseResponse<User>> {
        return this.usersService.findAllAdmin(request);
    }
    @Get("/customers")
    @UseGuards(AdminGuard)
    findAllCustomer(@Query() request: UserFilter): Promise<BaseResponse<User>> {
        return this.usersService.findAllCustomer(request);
    }

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //   return this.usersService.findOne(+id);
    // }

    // @Patch(":id")
    // @ApiTags("users")
    // update(
    //   @Param("id") id: string,
    //   @Body() updateUserDto: UpdateUserDto
    // ): Promise<BaseUpdatedResponse> {
    //   return this.usersService.update(+id, updateUserDto);
    // }

    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //   return this.usersService.delete(+id);
    // }
}
