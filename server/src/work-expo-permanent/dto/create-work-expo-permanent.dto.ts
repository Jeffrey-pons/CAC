import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkExpoPermanentDto {

  readonly title: string;

  public image: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  readonly dateOfExposition: string;

  @IsString()
  readonly type: string;
}
