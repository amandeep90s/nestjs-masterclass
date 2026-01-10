import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne() {
    return 'This action returns a user by id';
  }

  @Post()
  create() {
    return 'This action creates a new user';
  }

  @Put(':id')
  update() {
    return 'This action updates a user';
  }

  @Delete(':id')
  remove() {
    return 'This action removes a user';
  }
}
