import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkExpoPermanentDto } from './create-work-expo-permanent.dto';

export class UpdateWorkExpoPermanentDto extends PartialType(CreateWorkExpoPermanentDto) {}
