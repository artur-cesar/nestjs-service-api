import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Modality } from '../../modality/entities/modality.entity';

@Entity({ name: 'graduations' })
export class Graduation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column()
  modalityId: string;

  @ManyToOne(() => Modality, (modality) => modality.graduations)
  modality: Modality;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
