import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Modality } from '../../modality/entities/modality.entity';
import { Gender } from '../../enums/gender.enum';

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ enum: Object.values(Gender) })
  gender: string;

  @ManyToMany(() => Modality)
  @JoinTable()
  modalities: Modality[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
