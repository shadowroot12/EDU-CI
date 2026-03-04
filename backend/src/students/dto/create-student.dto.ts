export class CreateStudentDto {
  matricule_menetfp: string;
  nom: string;
  prenom: string;
  date_naissance: Date;
  genre: string;
  classe_id?: string;
}
