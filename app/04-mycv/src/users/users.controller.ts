import { 
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  Session
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { UpdateUserDto } from './dtos/update-user';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ){}

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  @Post('/signout')
  sigout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.authService.singup(
      body.email,
      body.password
    );
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
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
