import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The title of the task',
        default: 'Task title'
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The description of the task',
        default: 'Task description'
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The status of the task',
        default: 'Task status'
    })
    status: string;

    @IsDateString()
    @ApiProperty({
        type: Date,
        description: 'The due date of the task',
        default: new Date()
    })
    due_date: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The project ID the task belongs to',
        default: 'Project ID'
    })
    project_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The user ID the task is assigned to',
        default: 'User ID'
    })
    assigned_to: string;

}