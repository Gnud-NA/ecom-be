import { PartialType } from '@nestjs/swagger';
import { CreateMongoPriceLogDto } from './create-mongo-price-log.dto';

export class UpdateMongoPriceLogDto extends PartialType(CreateMongoPriceLogDto) {}
