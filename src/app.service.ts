/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getIndexData = () => 'Nest Cloud with Nest(Node.js) framework / TypeScript / Swagger. Available API: /api'
}
