import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArchiveDto {
  @IsNumber()
  @IsNotEmpty()
  readonly date: number;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;
}
