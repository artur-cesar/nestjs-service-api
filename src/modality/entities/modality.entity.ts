import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { LogInterceptor } from '../../interceptors/log.interceptor';
import { RoleGuard } from '../../guards/role.guard';
import { Graduation } from '../../graduation/entities/graduation.entity';
import { Professor } from '../../professor/entities/professor.entity';
import { Registration } from '../../registration/entities/registration.entity';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Entity({ name: 'modalities' })
export class Modality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Graduation, (graduation) => graduation.modality)
  @JoinColumn()
  graduations: Graduation[];

  @ManyToMany(() => Professor, (professor) => professor.modalities)
  @JoinTable({
    name: 'professor_modalities_rid',
    joinColumn: { name: 'modalityId', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'professorId', referencedColumnName: 'id'},
  })
  professors: Professor[]

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
