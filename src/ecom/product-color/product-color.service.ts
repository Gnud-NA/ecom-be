import { Injectable } from "@nestjs/common";
import { CreateProductColorDto } from "./dto/create-product-color.dto";
import { UpdateProductColorDto } from "./dto/update-product-color.dto";

@Injectable()
export class ProductColorService {
    create(createProductColorDto: CreateProductColorDto) {
        return "This action adds a new postColor";
    }

    findAll() {
        return `This action returns all postColor`;
    }

    findOne(id: number) {
        return `This action returns a #${id} postColor`;
    }

    update(id: number, updateProductColorDto: UpdateProductColorDto) {
        return `This action updates a #${id} postColor`;
    }

    remove(id: number) {
        return `This action removes a #${id} postColor`;
    }
}
