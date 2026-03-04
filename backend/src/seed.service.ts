import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './school/entities/class.entity';
import { Subject } from './school/entities/subject.entity';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';
import { UserRole } from './users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedClasses();
    await this.seedSubjects();
    await this.seedUsersAndStudents();
  }

  async seedClasses() {
    const count = await this.classRepo.count();
    if (count > 0) return;

    const classes = [
      { nom: '6ème 1', niveau: '6ème' },
      { nom: '6ème 2', niveau: '6ème' },
      { nom: '3ème 1', niveau: '3ème' },
      { nom: 'Tle C', niveau: 'Tle', serie: 'C' },
      { nom: 'Tle D', niveau: 'Tle', serie: 'D' },
    ];
    await this.classRepo.save(classes);
    console.log('✅ Classes seeded');
  }

  async seedSubjects() {
    const count = await this.subjectRepo.count();
    if (count > 0) return;

    const subjects = [
      { code: 'MATHS', libelle: 'Mathématiques', groupe: 'Scientifique' },
      { code: 'PC', libelle: 'Physique-Chimie', groupe: 'Scientifique' },
      { code: 'FR', libelle: 'Français', groupe: 'Littéraire' },
      { code: 'ANG', libelle: 'Anglais', groupe: 'Littéraire' },
      { code: 'HG', libelle: 'Histoire-Géo', groupe: 'Littéraire' },
    ];
    await this.subjectRepo.save(subjects);
    console.log('✅ Subjects seeded');
  }

  async seedUsersAndStudents() {
    const count = await this.userRepo.count();
    if (count > 0) return;

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash('password123', salt);

    // Admin
    await this.userRepo.save({
      username: 'admin',
      password_hash,
      role: UserRole.PROVISEUR,
      nom: 'Admin',
      prenom: 'System',
    });

    // Enseignant
    await this.userRepo.save({
      username: 'prof_maths',
      password_hash,
      role: UserRole.ENSEIGNANT,
      nom: 'KOUASSI',
      prenom: 'Jean',
    });

    // Élèves
    const classe6eme1 = await this.classRepo.findOneBy({ nom: '6ème 1' });
    if (classe6eme1) {
      const students = [
        { matricule: '123456A', nom: 'KOFFI', prenom: 'Aya Marie', genre: 'F' },
        { matricule: '123457B', nom: 'DIALLO', prenom: 'Moussa', genre: 'M' },
        { matricule: '123458C', nom: 'YAO', prenom: 'Grace', genre: 'F' },
      ];

      for (const s of students) {
        await this.studentRepo.save({
          matricule_menetfp: s.matricule,
          nom: s.nom,
          prenom: s.prenom,
          date_naissance: new Date('2012-01-01'),
          genre: s.genre,
          classe: classe6eme1,
        });
      }
    }
    console.log('✅ Users and Students seeded');
  }
}
