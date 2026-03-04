import { GradeType } from '../entities/grade.entity';

export class CreateGradeDto {
  valeur: number;
  sur?: number;
  type: GradeType;
  coefficient?: number;
  student_id: string;
  subject_id: string;
  teacher_id?: string;
  periode?: string;
}
