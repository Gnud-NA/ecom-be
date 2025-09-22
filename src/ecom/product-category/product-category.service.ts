import { Injectable } from "@nestjs/common";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";

@Injectable()
export class ProductCategoryService {
    create(createProductCategoryDto: CreateProductCategoryDto) {
        return "This action adds a new postCategory";
    }

    findAll() {
        return `This action returns all postCategory`;
    }

    findOne(id: number) {
        return `This action returns a #${id} postCategory`;
    }

    update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
        return `This action updates a #${id} postCategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} postCategory`;
    }
}
