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

    @IsString()
    readonly rencontretext: string;

    @IsString()
    readonly soutien: string;

}
