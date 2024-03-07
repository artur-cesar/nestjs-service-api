import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { FileSystemModule } from 'src/file-system/file-system.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: `D02dg2HgU7LjQF1pVqWCOp0B1UjnYqcW`,
    }),
    forwardRef(() => UserModule),
    FileSystemModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
