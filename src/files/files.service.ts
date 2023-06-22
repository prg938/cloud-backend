/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileEntity, FileType } from './entities/file.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FilesService {

  constructor(@InjectRepository(FileEntity) private repository: Repository<FileEntity>) {}

  findAll() { return this.repository.find() }

  remove(id: number, ids: string) {
    const idsArray = ids.split(',')
    const qb = this.repository.createQueryBuilder('file')
    qb.where('id IN (:...ids) AND userId = :id', {
      ids: idsArray,
      id
    })
    return qb.softDelete().execute()
  }

  find(id: number, type: FileType) {
    const qb = this.repository.createQueryBuilder('file')
    qb.where('file.userId = :id', {id})
    if (type === FileType.PHOTOS) {
      qb.andWhere('file.mimeType ILIKE :type', {type: '%image%'})
    }
    if (type === FileType.TRASH) {
      qb
      // Disables the global condition of "non-deleted"
      // for the entity with @DeleteDateColumn()'s
      .withDeleted()
      .andWhere('file.deletedAt IS NOT NULL')
    }
    return qb.getMany()
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      user: { id: userId }
    })
  }
}