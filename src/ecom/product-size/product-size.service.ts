import { Injectable } from "@nestjs/common";
import { CreateProductSizeDto } from "./dto/create-product-size.dto";
import { UpdateProductSizeDto } from "./dto/update-product-size.dto";

@Injectable()
export class ProductSizeService {
    create(createProductSizeDto: CreateProductSizeDto) {
        return "This action adds a new postSize";
    }

    findAll() {
        return `This action returns all postSize`;
    }

    findOne(id: number) {
        return `This action returns a #${id} postSize`;
    }

    update(id: number, updateProductSizeDto: UpdateProductSizeDto) {
        return `This action updates a #${id} postSize`;
    }

    remove(id: number) {
        return `This action removes a #${id} postSize`;
    }
}
