import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
import { MemberType } from '../entities/member.entity';
  
  export class CreateMemberDto {
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly lastname: string;
  
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly adresse: string;
  
    @IsString()
    @MaxLength(5)
    @IsNotEmpty()
    readonly postaladresse: string;

    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    readonly city: string;
  
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly country: string;
  
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly type: MemberType;
  }
  