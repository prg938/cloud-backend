/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, UseGuards, Query, Delete } from '@nestjs/common'
import { FilesService } from './files.service'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'
import { JwtAuthGuard } from 'src/auth/auth.guards'
import { UserId } from 'src/decorators/user-id.decorator'
import { FileType } from './entities/file.entity'

@Controller('files')
@ApiTags('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FilesController {
  
  constructor(private readonly filesService: FilesService) {}
  
  @Get('all')
  findAll() {
    return this.filesService.findAll()
  }
  
  // DELETE /files?ids=1,2,7,8
  @Delete()
  remove(@UserId() id: number, @Query('ids') ids: string) {
    return this.filesService.remove(id, ids)
  }
  
  @Get()
  find(@UserId() id: number, @Query('type') type: FileType) {
    return this.filesService.find(id, type)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: fileStorage
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  create(
    @UploadedFile(new ParseFilePipe({validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})]}))
    file: Express.Multer.File,
    @UserId() id: number
  ) {
    return this.filesService.create(file, id)
  }
}