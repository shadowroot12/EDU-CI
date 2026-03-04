import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string; // Ex: MATHS, HIST-GEO

  @Column()
  libelle: string; // Ex: Mathématiques

  @Column({ nullable: true })
  groupe: string; // Ex: Scientifique, Littéraire
}
