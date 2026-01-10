import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

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
  create(@Body() body: { firstName: string; lastName: string }) {
    console.log({ body });
    return 'This action creates a new user';
  }

  @Put(':id')
  update() {
    return 'This action updates a user';
  }

  @Delete(':id{/:optional}') // Add forward slash with curly braces if params is used as optional {/:id}
  remove(
    @Param() params: { id: string; optional?: string },
    @Query() query: { test: string },
  ) {
    console.log({ params, query });
    return 'This action removes a user';
  }
}
