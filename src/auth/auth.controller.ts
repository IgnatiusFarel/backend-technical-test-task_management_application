import { Controller, Post, Body, BadRequestException, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService
  ) { }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { username, email, password, full_name, avatar_url } = body;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        full_name,
        avatar_url
      }
    });

    return { message: 'User registered successfully', user: newUser };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.authService.login(user);
  }
}