import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateUserDto: UpdateUserDto) {}

  remove(id: number) {}
}
