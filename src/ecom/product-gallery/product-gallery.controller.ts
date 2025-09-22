import { Controller } from "@nestjs/common";
import { ProductGalleryService } from "./product-gallery.service";

@Controller("product-color")
export class ProductGalleryController {
    constructor(private readonly productGalleryService: ProductGalleryService) {}
}
