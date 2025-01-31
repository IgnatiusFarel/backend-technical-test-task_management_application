import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto {

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Username of the user',
        default: 'john_doe'
    })
    username: string;

    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'Email of the user',
        default: 'user@gmail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Password of the user',
        default: 'password'
    })
    password: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Full name of the user',
        default: 'John Doe'
    })
    full_name: string;

    @IsString()
    @ApiProperty({
        type: String,
        format: 'binary',
        description: 'Image of the user',
        default: 'File image'
    })
    avatar_url: string;
}
