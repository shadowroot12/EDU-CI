import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { Class } from './entities/class.entity';
import { Subject } from './entities/subject.entity';
import { AcademicYear } from './entities/academic-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Subject, AcademicYear])],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
