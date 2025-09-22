import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { BaseResponse } from "@src/base";
import { RegistryEventFilter } from "@src/ecom/registry-event/dto/registry-event.dto";
import { RegistryEvent } from "@src/ecom/registry-event/entities/registry-event.entity";
import { RegistryEventService } from "@src/ecom/registry-event/registry-event.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/registry-event")
@ApiTags("Registry Event")
@UseInterceptors(ContextInterceptor)
export class RegistryEventController {
    constructor(private readonly registryEventService: RegistryEventService) {}

    // @Post()
    // create(@Body() createAddressBookDto: CreateAddressBookDto, @Req() req: RequestWithAuth) {
    //     return this.addressBookService.create(createAddressBookDto, req.auth.userId);
    // }

    // @Patch(":id")
    // update(
    //     @Param("id") id: string,
    //     @Body() updateAddressBookDto: UpdateAddressBookDto
    // ): Promise<BaseUpdatedResponse<AddressBook>> {
    //     return this.addressBookService.update(+id, updateAddressBookDto);
    // }

    @ApiOkResponse({
        description: "The Registry Event records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(RegistryEvent),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: RegistryEventFilter): Promise<BaseResponse<RegistryEvent[]>> {
        return this.registryEventService.findAll(request);
    }

    // @Get(":id")
    // findOne(@Param("id") id: string, @Req() req: RequestWithAuth) {
    //     return this.addressBookService.findOne(+id, req.auth.userId);
    // }

    // @Delete(":id")
    // remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
    //     return this.addressBookService.delete(+id, req.auth.userId);
    // }
}
