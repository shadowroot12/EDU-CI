import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  username: string;
  password: string; // Required for creation
  password_hash?: string; // For internal use
  role: UserRole;
  nom?: string;
  prenom?: string;
  telephone?: string;
  etablissement_id?: string;
}
