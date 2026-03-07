import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Username est requis' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password est requis' })
  @MinLength(6, { message: 'Le mot de passe doit faire au minimum 6 caractères' })
  password: string;
}
