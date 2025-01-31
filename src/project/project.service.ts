import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        owner: {                  
          connect: { id: userId }
        }
      }
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { created_by: userId }, 
      include: {
        tasks: true,
        owner: {                   
          select: { id: true, username: true }
        }
      }
    });
  }

  async findOne(userId: string, projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
        created_by: userId
      },
      include: {
        tasks: true,
        owner: {
          select: { id: true, username: true }
        }
      }
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(userId: string, projectId: string, dto: UpdateProjectDto) {
    await this.validateOwnership(userId, projectId);

    return this.prisma.project.update({
      where: { id: projectId },
      data: dto
    });
  }

  async remove(userId: string, projectId: string) {
    await this.validateOwnership(userId, projectId);

    return this.prisma.project.delete({
      where: { id: projectId }
    });
  }

  private async validateOwnership(userId: string, projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { created_by: true }
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.created_by !== userId) {
      throw new ForbiddenException('You are not the owner of this project');
    }
  }
}