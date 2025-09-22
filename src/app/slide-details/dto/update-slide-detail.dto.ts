import { PartialType } from '@nestjs/swagger';
import { CreateSlideDetailDto } from './create-slide-detail.dto';

export class UpdateSlideDetailDto extends PartialType(CreateSlideDetailDto) {}
