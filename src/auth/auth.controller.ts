/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './auth.guards'


@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  
  @Post('register') 
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({type: LoginUserDto})
  login(@Request() request) {
    return this.authService.login(request.user)
  }
}
