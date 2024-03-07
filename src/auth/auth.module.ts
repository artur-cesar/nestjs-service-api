import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { FileSystemModule } from 'src/file-system/file-system.module';

@Module({
  imports: [
    JwtModule.register({
      secret: `D02dg2HgU7LjQF1pVqWCOp0B1UjnYqcW`,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileSystemModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
