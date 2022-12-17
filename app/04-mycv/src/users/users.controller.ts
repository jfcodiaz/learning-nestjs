import { 
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { UpdateUserDto } from './dtos/update-user';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService:UsersService){}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(
      body.email,
      body.password
    );
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    return user ?? new NotFoundException('');
  }

  @Get()
  findAllUsers(@Query('email') email:string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id:string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body:UpdateUserDto) {
    return this.userService.update(parseInt(id), body)

  }
}
