import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { FilterPostDto } from "@src/app/posts/dto/post.dto";
import { Post as PostEntity } from "@src/app/posts/entities/post.entity";
import { BaseResponse } from "@src/base";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@ApiTags("Posts")
@ApiBearerAuth()
@Controller("posts")
@UseInterceptors(ContextInterceptor)
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
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
                        $ref: getSchemaPath(PostEntity),
                    },
                },
            },
        },
    })
    @Get()
    @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterPostDto): Promise<BaseResponse<PostEntity[]>> {
        return this.postsService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Post records",
        schema: {
            $ref: getSchemaPath(PostEntity),
        },
    })
    @Get(":id")
    @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.postsService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.postsService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.postsService.destroy(+id);
    }
}
