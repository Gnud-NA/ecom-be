import { Module } from "@nestjs/common";
import { BaseService } from "./base.sevice";

@Module({
  imports: [],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
