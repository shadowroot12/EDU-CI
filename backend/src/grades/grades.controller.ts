import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('grades')
@UseGuards(AuthGuard('jwt'))
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  findAll(@Query('studentId') studentId?: string, @Query('classId') classId?: string, @Query('subjectId') subjectId?: string) {
    if (studentId) {
      return this.gradesService.findByStudent(studentId);
    }
    if (classId && subjectId) {
      return this.gradesService.findByClassAndSubject(classId, subjectId);
    }
    return this.gradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
