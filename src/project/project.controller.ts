import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { RequestWithUser } from 'src/auth/types/request-with-user';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/json')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new project' })
  create(@Req() req: RequestWithUser, @Body() dto: CreateProjectDto) {
    return this.projectService.create(req.user.id, dto);
  }

  @Get()
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/json')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all projects' })
  findAll(@Req() req: RequestWithUser) {
    return this.projectService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/json')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a project by ID' })
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.projectService.findOne(req.user.id, id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/json')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a project by ID' })
  update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/json')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a project by ID' })
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.projectService.remove(req.user.id, id);
  }
}