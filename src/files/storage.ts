/* eslint-disable prettier/prettier */
import {diskStorage} from 'multer'

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: function(req, file, callback) {
    const idGenerator = () => Array(18).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')
    const dot = '.'
    const fileExtName = file.originalname.split(dot).pop()
    callback(null, idGenerator() + dot + fileExtName)
  }
})