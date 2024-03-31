import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  public image: string[];

  @IsString()
  @IsNotEmpty()
  readonly month: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString({ each: true })
  readonly rencontretext: string[];

  @IsString({ each: true })
  readonly event: string[];

  @IsString({ each: true })
  readonly soutien: string[];
}
