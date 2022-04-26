import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Bruno Bozzetti',
      email: 'brunobozz@gmail.com',
      password: '12345678',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const currentMaxId = this.users[this.users.length - 1]?.id || 0;
    const id = currentMaxId + 1;
    const user = {
      id,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    return this.users[index];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const newUser = {
      ...user,
      ...updateUserDto,
    };

    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = newUser;
    return newUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not exists`);
    }
    this.users.splice(index, 1);
    return;
  }
}
