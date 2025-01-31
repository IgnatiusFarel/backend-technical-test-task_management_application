import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, dto: CreateTaskDto) {
        await this.validateRelations(dto);
        return await this.prisma.task.create({
            data: dto
        });
    }

    async findAll(projectId: string) {
        return await this.prisma.task.findMany({
            where: { project_id: projectId },
            include: { assignee: true }
        });
    }

    async findOne(id: string) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: { assignee: true, project: true }
        });

        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async update(id: string, dto: UpdateTaskDto) {
        if (dto.project_id || dto.assigned_to) {
            await this.validateRelations(dto as CreateTaskDto);
        }

        return this.prisma.task.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string) {
        return this.prisma.task.delete({
            where: { id }
        });
    }

    private async validateRelations(dto: CreateTaskDto) {
        const [project, user] = await Promise.all([
            this.prisma.project.findUnique({ where: { id: dto.project_id } }),
            this.prisma.user.findUnique({ where: { id: dto.assigned_to } })
        ]);

        if (!project) throw new BadRequestException('Invalid project');
        if (!user) throw new BadRequestException('Invalid user');
    }
}
