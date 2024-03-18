import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateAdminDto  {
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly roleNumber: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly email: number;
}