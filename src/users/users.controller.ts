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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserParamDto } from './dtos';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  // Dependency Injection - Injecting Users Service
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of registered users with pagination',
    description:
      'You can specify the page number and the number of items per page using query parameters.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Users have been successfully retrieved based on the pagination parameters.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Page number for pagination',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Number of items per page for pagination',
    default: 10,
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param() getUserParamDto: GetUserParamDto) {
    return this.usersService.findById(getUserParamDto.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
