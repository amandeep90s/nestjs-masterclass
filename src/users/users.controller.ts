import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';

@Controller('users')
export class UsersController {
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log({ page, limit });
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return 'This action returns a user by id';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return 'This action creates a new user';
  }

  @Put(':id')
  update() {
    return 'This action updates a user';
  }

  @Delete(':id') // Add forward slash with curly braces if params is used as optional {/:id}
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });

    return 'This action removes a user';
  }
}
