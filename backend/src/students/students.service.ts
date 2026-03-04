import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  findAll() {
    return this.studentsRepository.find({ relations: ['classe', 'user'] });
  }

  findOne(id: string) {
    return this.studentsRepository.findOne({
      where: { id },
      relations: ['classe', 'user', 'grades'],
    });
  }

  findByClass(classId: string) {
    return this.studentsRepository.find({
      where: { classe: { id: classId } },
      relations: ['user'],
    });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentsRepository.update(id, updateStudentDto);
  }

  remove(id: string) {
    return this.studentsRepository.delete(id);
  }
}
