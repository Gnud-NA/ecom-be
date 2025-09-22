import { Module } from "@nestjs/common";
import { ProductColorController } from "./product-color.controller";
import { ProductColorService } from "./product-color.service";

@Module({
    controllers: [ProductColorController],
    providers: [ProductColorService],
})
export class ProductColorModule {}
