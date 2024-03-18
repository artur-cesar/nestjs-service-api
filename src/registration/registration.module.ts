import { Module, forwardRef } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { UserModule } from '../user/user.module';
import { ModalityModule } from '../modality/modality.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { Modality } from '../modality/entities/modality.entity';
import { Registration } from './entities/registration.entity';

@Module({
  imports: [
    UserModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Registration, Student, Modality]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
