import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the project',
        default: 'Project Name'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The description of the project',
        default: 'Project Description'
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The status of the project',
        default: 'Project status'
    })
    status: string;

    @IsDateString()
    @ApiProperty({
        type: Date,
        description: 'The start date of the project',
        default: new Date()
    })
    start_date: Date;

    @IsDateString()
    @ApiProperty({
        type: Date,
        description: 'The end date of the project',
        default: new Date()
    })
    end_date: Date;
}