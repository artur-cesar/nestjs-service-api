import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Modality } from "../../modality/entities/modality.entity";

@Entity("professors")
export class Professor {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Modality, {cascade: true})
    @JoinTable({
        name: 'professor_modalities_rid',
        joinColumn: { name: 'professorId', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'modalityId', referencedColumnName: 'id'},
    })
    modalities: Modality[]

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}
