import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { RequestWithAuth } from "@src/base";
import { ImportProductDto } from "@src/ecom/import-product/dto/import-product.dto";
import { ImportProductService } from "./import-product.service";
@ApiTags("Import Product")
@ApiBearerAuth()
@Controller("ecom/import-products")
export class ImportProductController {
    constructor(private readonly importProductService: ImportProductService) {}

    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "CSV file",
        type: ImportProductDto,
    })
    async import(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: RequestWithAuth,
        @Body() body: ImportProductDto
    ) {
        const userId = req?.auth?.userId;
        return this.importProductService.importCSV({ file, userId, brandName: body.brandName });
    }
}
