import { Injectable } from "@nestjs/common";
import { CreateProductGalleryDto } from "./dto/create-product-gallery.dto";
import { UpdateProductGalleryDto } from "./dto/update-product-gallery.dto";

@Injectable()
export class ProductGalleryService {
    create(createProductGalleryDto: CreateProductGalleryDto) {
        return "This action adds a new postGallery";
    }

    findAll() {
        return `This action returns all postGallery`;
    }

    findOne(id: number) {
        return `This action returns a #${id} postGallery`;
    }

    update(id: number, updateProductGalleryDto: UpdateProductGalleryDto) {
        return `This action updates a #${id} postGallery`;
    }

    remove(id: number) {
        return `This action removes a #${id} postGallery`;
    }
}
