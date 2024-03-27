import { PartialType } from '@nestjs/mapped-types';
import { CreateMediationDto } from './create-mediation.dto';

export class UpdateMediationDto extends PartialType(CreateMediationDto) {}
