import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return 'This action returns a user by id';
  }

  @Post()
  create(@Body() body: { firstName: string; lastName: string }) {
    console.log({ body });
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
