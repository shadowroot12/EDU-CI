import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Class } from '../../school/entities/class.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  matricule_menetfp: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ type: 'date' })
  date_naissance: Date;

  @Column()
  genre: string; // M, F

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User; // Compte utilisateur associé (optionnel)

  @ManyToOne(() => Class, (classe) => classe.students)
  classe: Class;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
