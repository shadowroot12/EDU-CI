import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academic_years')
export class AcademicYear {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  libelle: string; // Ex: 2025-2026

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ default: false })
  active: boolean;
}
