import { Module, forwardRef } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modality } from './entities/modality.entity';

@Module({
  imports: [
    UserModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Modality]),
  ],
  controllers: [ModalityController],
  providers: [ModalityService],
})
export class ModalityModule {}
