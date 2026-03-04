import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradesRepository: Repository<Grade>,
  ) {}

  create(createGradeDto: CreateGradeDto) {
    const grade = this.gradesRepository.create(createGradeDto);
    return this.gradesRepository.save(grade);
  }

  findAll() {
    return this.gradesRepository.find({ relations: ['student', 'subject', 'teacher'] });
  }

  findByStudent(studentId: string) {
    return this.gradesRepository.find({
      where: { student: { id: studentId } },
      relations: ['subject'],
    });
  }

  findByClassAndSubject(classId: string, subjectId: string) {
    return this.gradesRepository.find({
      where: {
        student: { classe: { id: classId } },
        subject: { id: subjectId },
      },
      relations: ['student'],
    });
  }

  findOne(id: string) {
    return this.gradesRepository.findOne({ where: { id }, relations: ['student', 'subject'] });
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    return this.gradesRepository.update(id, updateGradeDto);
  }

  remove(id: string) {
    return this.gradesRepository.delete(id);
  }
}
