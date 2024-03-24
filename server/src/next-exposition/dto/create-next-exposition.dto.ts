import { IsNotEmpty, IsString} from 'class-validator';

export class CreateNextExpositionDto {


  @IsString()
  @IsNotEmpty()
  readonly titleDate: string;

  public image: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly dateOfExpo: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

}
