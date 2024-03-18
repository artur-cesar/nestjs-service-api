import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('professor_modalities_rid')
export class ProfessorModality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  modalityId: string;

  @Column()
  professorId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
