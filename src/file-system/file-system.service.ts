import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileSystemService {
  async upload(file: Express.Multer.File, path: string): Promise<void> {
    return writeFile(path, file.buffer);
  }
}
