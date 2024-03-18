import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Modality } from '../../modality/entities/modality.entity';

@Entity('registrations')
export class Registration {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Student)
  @JoinColumn()
  student: Student;

  @ManyToMany(() => Modality)
  @JoinTable()
  modalities: Modality[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
