import { PartialType } from '@nestjs/mapped-types';
import { CreateNextExpositionDto } from './create-next-exposition.dto';

export class UpdateNextExpositionDto extends PartialType(CreateNextExpositionDto) {}
