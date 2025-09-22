import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { MediaFilter, PreSignedUrlDto, UploadImageDto } from "@src/app/media/dto/media.dto";
import { RequestWithAuth } from "@src/base";
import { MediaService } from "./media.service";

@ApiTags("Media")
@Controller("media")
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @UseGuards(AdminGuard)
    @Post("upload-file")
    @UseInterceptors(FilesInterceptor("images", 20))
    @ApiTags("Media")
    @ApiConsumes("multipart/form-data")
    @ApiBody({ type: UploadImageDto })
    @ApiOperation({ summary: "Upload and process an image" })
    @ApiResponse({ status: 201, description: "Image processed successfully" })
    @ApiBearerAuth()
    async uploadImage(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() uploadImageDto: UploadImageDto,
        @Req() request: RequestWithAuth
    ) {
        const userId = request?.auth?.userId;
        return this.mediaService.processImageS3(files, uploadImageDto, userId);
    }

    @Post("get-pre-signed-url")
    @ApiTags("Media")
    @ApiBody({ type: [PreSignedUrlDto] })
    @ApiOperation({ summary: "Get pre-signed URL" })
    @ApiResponse({ status: 201, description: "" })
    @ApiBearerAuth()
    async generatePreSignedUrl(@Body() preSignedUrlDto: PreSignedUrlDto[], @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.mediaService.generatePreSignedUrl(preSignedUrlDto, userId);
    }

    @Get("/")
    async findAll(@Query() filter: MediaFilter) {
        return this.mediaService.findAll(filter);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.mediaService.delete(+id);
    }
}
