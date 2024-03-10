import { Module } from '@nestjs/common';
import { GraduationService } from './graduation.service';
import { GraduationController } from './graduation.controller';

@Module({
  controllers: [GraduationController],
  providers: [GraduationService],
})
export class GraduationModule {}
