import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../school/entities/subject.entity';
import { User } from '../../users/entities/user.entity';

export enum GradeType {
  INTERRO = 'INTERRO',
  DEVOIR = 'DEVOIR',
  COMPO = 'COMPO',
}

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  valeur: number; // Note sur 20

  @Column({ type: 'float', default: 20 })
  sur: number; // Base de la note (ex: 10, 20)

  @Column({
    type: 'enum',
    enum: GradeType,
    default: GradeType.INTERRO,
  })
  type: GradeType;

  @Column({ type: 'float', default: 1 })
  coefficient: number;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => User) // Enseignant qui a saisi
  teacher: User;

  @Column({ nullable: true })
  periode: string; // Trimestre 1, Semestre 2...

  @CreateDateColumn()
  date_saisie: Date;
}
