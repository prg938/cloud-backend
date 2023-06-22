/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/auth.guards'
import { UserId } from 'src/decorators/user-id.decorator'

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@UserId() id: number) {
    return this.usersService.findById(id)
  }
}