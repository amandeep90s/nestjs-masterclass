import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
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
  create(
    @Body() body: { firstName: string; lastName: string },
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log({ body, headers, ip });
    return 'This action creates a new user';
  }

  @Put(':id')
  update() {
    return 'This action updates a user';
  }

  @Delete(':id{/:optional}') // Add forward slash with curly braces if params is used as optional {/:id}
  remove(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Param('optional') optional?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    console.log({ id, optional, limit });
    return 'This action removes a user';
  }
}
