/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  private generateJSONWebToken(id: number) {
    return this.jwtService.sign({id})
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user && user.password === password) {
      const {password, ...result} = user
      return result
    }
    return null
  }

  async register(dto: CreateUserDto) {
    try {
      const registeredUser = await this.usersService.create(dto)
      const token = this.generateJSONWebToken(registeredUser.id)
      return {token}
    }
    catch(error) {
      throw new ForbiddenException('Cannot register this user')
    }
  }

  login(user: UserEntity) {
    const token = this.generateJSONWebToken(user.id)
    return {token}
  }
}
