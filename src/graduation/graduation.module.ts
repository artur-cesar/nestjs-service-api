import { Module, forwardRef } from '@nestjs/common';
import { GraduationService } from './graduation.service';
import { GraduationController } from './graduation.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Graduation } from './entities/graduation.entity';

@Module({
  imports: [
    UserModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Graduation]),
  ],
  controllers: [GraduationController],
  providers: [GraduationService],
})
export class GraduationModule {}
