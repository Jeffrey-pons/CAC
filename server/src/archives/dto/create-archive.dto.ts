import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArchiveDto {
  @IsNumber()
  @IsNotEmpty()
  readonly date: number;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly month: string;

  public image: string[];

  @IsString()
  readonly description: string;

  @IsString()
  readonly rencontretext: string;

  @IsString()
  readonly type: string;

}

