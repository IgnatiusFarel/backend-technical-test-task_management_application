import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'The email of the user',
        default: 'user@gmail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The password of the user',
        default: 'password'
    })
    password: string;
}
