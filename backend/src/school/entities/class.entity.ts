import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subject } from './subject.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string; // Ex: 6ème 1, Tle C

  @Column()
  niveau: string; // Ex: 6ème, Tle

  @Column({ nullable: true })
  serie: string; // Ex: A, C, D (Optionnel pour collège)

  @OneToMany(() => Student, (student) => student.classe)
  students: Student[];

  // Relation ManyToMany avec Subject pourrait être mieux via une table de jointure avec coeff
  // Pour simplifier ici, on suppose que les matières sont définies globalement ou par niveau
}
