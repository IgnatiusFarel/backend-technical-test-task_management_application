import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The username of the user',
        default: 'john_doe'
    })
    username: string;

    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'The email of the user',
        default: 'johndoe@gmail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The password of the user',
        default: 'password'
    })
    password: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The full name of the user',
        default: 'John Doe'
    })
    full_name: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The avatar of the user',
        default: 'avatar.jpg'
    })
    avatar_url: string;
}
