import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterProductDto } from "@src/ecom/product/dto/product.dto";
import { UpdateProductDto } from "@src/ecom/product/dto/update-product.dto";
import Product from "@src/ecom/product/entities/product.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@ApiTags("Product")
@ApiBearerAuth()
@Controller("ecom/products")
@UseInterceptors(ContextInterceptor)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // @UseGuards(AdminGuard)
    @Post()
    create(@Body() createPostDto: CreateProductDto) {
        return this.productService.create(createPostDto);
    }

    @ApiOkResponse({
        description: "The product records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(Product),
                    },
                },
            },
        },
    })
    @Get()
    @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterProductDto): Promise<BaseResponse<Product[]>> {
        return this.productService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The product records",
        schema: {
            $ref: getSchemaPath(Product),
        },
    })
    @Get(":id")
    @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.productService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePostDto: UpdateProductDto) {
        return this.productService.update(+id, updatePostDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.productService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.productService.destroy(+id);
    }
}
