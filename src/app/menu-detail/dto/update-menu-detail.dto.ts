import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateMenuDetailDto } from "./create-menu-detail.dto";

export class UpdateMenuDetailDto extends PartialType(CreateMenuDetailDto) {}

export class UpdateMenuDetailPriority {
    @IsNotEmpty()
    @ApiProperty({
        name: "newOrder",
        type: "number",
    })
    newOrder: number;
}
