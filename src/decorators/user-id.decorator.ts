/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common"

type FactoryType = number | null

const UserId = createParamDecorator((_: unknown, ctx: ExecutionContext): FactoryType => {
  const request = ctx.switchToHttp().getRequest()
  if (request.user) {
    return Number(request.user.id)
  }
  return null
})

export {UserId}