import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @IsOptional() 
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() 
  readonly role?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional() 
  readonly email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional() 
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  readonly password?: string;
}