import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { RequestWithUser } from "src/auth/types/request-with-user";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiConsumes('application/json')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new task' })
    create(@Req() req: RequestWithUser, @Body() dto: CreateTaskDto) {
        return this.taskService.create(req.user.id, dto);
    }

    @Get('project/:projectId')
    @ApiConsumes('multipart/form-data')
    @ApiConsumes('application/json')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a task by project ID' })
    findAll(@Param('projectId') projectId: string) {
        return this.taskService.findAll(projectId)
    }

    @Get(':id')
    @ApiConsumes('multipart/form-data')
    @ApiConsumes('application/json')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a task by ID' })
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiConsumes('application/json')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a task by ID' })
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(id, dto);
    }

    @Delete(':id')
    @ApiConsumes('multipart/form-data')
    @ApiConsumes('application/json')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a task by ID' })
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }

}