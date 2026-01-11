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
import { CreateUserDto, GetUserParamDto } from './dtos';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  // Dependency Injection - Injecting Users Service
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log({ page, limit });
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param() getUserParamDto: GetUserParamDto) {
    console.log(typeof getUserParamDto.id);

    return 'This action returns a user by id';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return 'This action creates a new user';
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
    console.log({ updateUserDto });
    return 'This action updates a user';
  }

  @Delete(':id') // Add forward slash with curly braces if params is used as optional {/:id}
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });

    return 'This action removes a user';
  }
}
