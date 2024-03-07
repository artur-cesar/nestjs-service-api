import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileSystemService {
  async upload(file: Express.Multer.File, path: string) {
    return writeFile(path, file.buffer);
  }
}
