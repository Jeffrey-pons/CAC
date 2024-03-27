import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediationDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;
    
    public image: string;
    
    @IsString()
    @IsNotEmpty()
    readonly intro: string;
    
    @IsString()
    @IsNotEmpty()
    readonly subtitle: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsString()
    @IsNotEmpty()
    readonly infosupp: string;
    
}
