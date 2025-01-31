import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (existingEmail) {
      throw new ConflictException('Email is already taken');
    }
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.user.create({
        data: { ...userData, password: hashedPassword }
      });

      return {
        status: "Success",
        message: "User created successfully",
        data: newUser
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate entry');
        }
      }
      throw new InternalServerErrorException('Failed to create user')
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    try {
      return {
        status: "Success",
        message: "Users retrieved successfully",
        data: users
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate entry');
        }
      }
      throw new InternalServerErrorException('Failed to retrieve users')
    }
  }

  async findOne(id: string) {
    const users = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!users) {
      throw new NotFoundException('User not found');
    }

    try {
      return {
        status: "Success",
        data: users
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate entry');
        }
      }
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email }
      });

      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('Email is already taken');
      }
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      });

      return {
        status: "Success",
        message: "User updated successfully",
        data: updatedUser
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate entry');
        }
      }
      throw new InternalServerErrorException('Failed to update user')
    }
  }

  async remove(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.prisma.user.delete({
        where: { id }
      });

      return {
        status: "Success",
        message: "User deleted successfully"
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate entry');
        }
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
