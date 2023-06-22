/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({ default: 'Мужичек' }) fullname: string
  @ApiProperty({ default: '1234' }) password: string
  @ApiProperty({ default: 't@t.com' }) email: string
}
