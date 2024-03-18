import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';
import { ModalityModule } from './modality/modality.module';
import { Modality } from './modality/entities/modality.entity';
import { GraduationModule } from './graduation/graduation.module';
import { Graduation } from './graduation/entities/graduation.entity';
import { ProfessorModule } from './professor/professor.module';
import { Professor } from './professor/entities/professor.entity';
import { ProfessorModality } from './professor/entities/professor-modality.entity';
import { RegistrationModule } from './registration/registration.module';
import { Registration } from './registration/entities/registration.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: '	dale54@ethereal.email',
          pass: 'htA76GUhYfDJ8xcJ4V',
        },
      },
      defaults: {
        from: '"Tutti" <arturcesar.melo@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLE_TTL),
        limit: Number(process.env.THROTTLE_LIMIT),
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'api',
      port: 5432,
      migrations: [`${__dirname}/../../migrations/**/*.ts`],
      entities: [
        User,
        Student,
        Modality,
        Graduation,
        Professor,
        ProfessorModality,
        Registration,
      ],
    }),
    UserModule,
    AuthModule,
    StudentModule,
    ModalityModule,
    GraduationModule,
    ProfessorModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
