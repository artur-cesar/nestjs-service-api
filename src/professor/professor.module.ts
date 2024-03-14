import { Module, forwardRef } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { Modality } from '../modality/entities/modality.entity';
import { ModalityModule } from '../modality/modality.module';

@Module({
  imports: [
    UserModule,
    ModalityModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Professor, Modality]),
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
