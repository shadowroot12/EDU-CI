import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { StudentsModule } from './students/students.module';
import { GradesModule } from './grades/grades.module';
import { SeedService } from './seed.service';
import { Class } from './school/entities/class.entity';
import { Subject } from './school/entities/subject.entity';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Use DATABASE_URL if provided (for Railway/Render), otherwise use individual params
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USER || 'edu_user',
            password: process.env.DB_PASSWORD || 'edu_password',
            database: process.env.DB_NAME || 'edu_db',
          }),
      entities: [Class, Subject, Student, User],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development', // Only in development
      logging: process.env.NODE_ENV === 'development',
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
    TypeOrmModule.forFeature([Class, Subject, Student, User]),
    UsersModule,
    AuthModule,
    SchoolModule,
    StudentsModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
