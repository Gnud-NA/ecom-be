import { Controller } from "@nestjs/common";
import { ProductSizeService } from "./product-size.service";

@Controller("product-size")
export class ProductSizeController {
    constructor(private readonly productSizeService: ProductSizeService) {}
}
