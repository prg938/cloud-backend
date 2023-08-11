/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
  @ApiProperty({ default: '1234' }) password: string
  @ApiProperty({ default: 't@t.com' }) email: string
}
