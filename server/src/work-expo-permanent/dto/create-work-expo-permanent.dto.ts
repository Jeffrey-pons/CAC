import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateWorkExpoPermanentDto {

    @IsString()
    @MaxLength(30)
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

}
