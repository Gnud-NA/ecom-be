import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterStateDto } from "@src/ecom/state/dto/state.dto";
import { UpdateStateDto } from "@src/ecom/state/dto/update-state.dto";
import { State as StateEntity } from "@src/ecom/state/entities/state.entity";
import { CreateStateDto } from "./dto/create-state.dto";
import { StateService } from "./state.service";

@ApiTags("State")
@ApiBearerAuth()
@Controller("states")
export class StateController {
    constructor(private readonly stateService: StateService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createStateDto: CreateStateDto) {
        return this.stateService.create(createStateDto);
    }

    @ApiOkResponse({
        description: "The State records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(StateEntity),
                    },
                },
            },
        },
    })
    @Get()
    // @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterStateDto): Promise<BaseResponse<StateEntity[]>> {
        return this.stateService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The State records",
        schema: {
            $ref: getSchemaPath(StateEntity),
        },
    })
    @Get(":id")
    // @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.stateService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateStateDto: UpdateStateDto) {
        return this.stateService.update(+id, updateStateDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.stateService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.stateService.destroy(+id);
    }
}
