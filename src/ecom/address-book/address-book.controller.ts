import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseDeletedResponse, BaseResponse, BaseUpdatedResponse, RequestWithAuth } from "@src/base";
import { AddressBookService } from "@src/ecom/address-book/address-book.service";
import { AddressBookFilter } from "@src/ecom/address-book/dto/address-book.dto";
import { CreateAddressBookDto } from "@src/ecom/address-book/dto/create-address-book.dto";
import { UpdateAddressBookDto } from "@src/ecom/address-book/dto/update-address-book.dto";
import AddressBook from "@src/ecom/address-book/entities/address-book.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/my-address-book")
@ApiTags("My Address Book")
@ApiBearerAuth()
@UseGuards(UserGuard)
@UseInterceptors(ContextInterceptor)
export class AddressBookController {
    constructor(private readonly addressBookService: AddressBookService) {}

    @Post()
    create(@Body() createAddressBookDto: CreateAddressBookDto, @Req() req: RequestWithAuth) {
        return this.addressBookService.create(createAddressBookDto, req.auth.userId);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateAddressBookDto: UpdateAddressBookDto
    ): Promise<BaseUpdatedResponse<AddressBook>> {
        return this.addressBookService.update(+id, updateAddressBookDto);
    }

    @ApiOkResponse({
        description: "The Post records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(AddressBook),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Req() req: RequestWithAuth, @Query() request: AddressBookFilter): Promise<BaseResponse<AddressBook[]>> {
        return this.addressBookService.findAll(request, req.auth.userId);
    }

    @Post("/:id/set-default")
    setDefault(@Param("id") id: string, @Req() req: RequestWithAuth) {
        return this.addressBookService.setDefault(+id, req.auth.userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Req() req: RequestWithAuth) {
        return this.addressBookService.findOne(+id, req.auth.userId);
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
        return this.addressBookService.delete(+id, req.auth.userId);
    }
}
