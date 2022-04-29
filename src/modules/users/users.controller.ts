import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get()
  findAll() {
    return { data: 'fdhdfgh' };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
