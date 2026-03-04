import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);
    
    const user = this.usersRepository.create({
      ...userData,
      password_hash,
    });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...updateData } = updateUserDto;
    const dataToUpdate: any = { ...updateData };

    if (password) {
      const salt = await bcrypt.genSalt();
      dataToUpdate.password_hash = await bcrypt.hash(password, salt);
    }
    
    return this.usersRepository.update(id, dataToUpdate);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
