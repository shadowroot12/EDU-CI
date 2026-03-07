import { IsString, IsNotEmpty, MinLength, IsOptional, ValidateIf, IsEmail } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username est requis' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password est requis' })
  @MinLength(6, { message: 'Le mot de passe doit faire au minimum 6 caractères' })
  password: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  etablissement_id?: string;
}
