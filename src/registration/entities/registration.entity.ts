import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Modality } from '../../modality/entities/modality.entity';

@Entity('registrations')
export class Registration {
  id: string;

  @OneToOne(() => Student)
  @JoinColumn()
  student: Student;

  @ManyToMany(() => Modality, (modality) => modality.registration)
  @JoinTable({
    name: 'registration_modalities_rid',
    joinColumn: { name: 'registrationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'modalityId', referencedColumnName: 'id' },
  })
  modalities: Modality[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
