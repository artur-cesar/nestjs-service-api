import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProfessorsModalities1710297494369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "professor_modalities_rid",
            columns: [
                {
                    name: "modalityId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_modality_professsor_modality_id"
                },
                {
                    name: "professorId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_modality_professsor_professor_id"
                }
            ]
        }));

        await queryRunner.query(
            `ALTER TABLE 
                professor_modalities_rid 
            ADD CONSTRAINT 
            fk_modality_professsor_modality_id FOREIGN KEY ("modalityId") REFERENCES modalities (id)`,
        )

        await queryRunner.query(
            `ALTER TABLE 
                professor_modalities_rid 
            ADD CONSTRAINT fk_modality_professsor_professor_id FOREIGN KEY ("professorId") REFERENCES professors (id)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("professor_modalities_rid", true)
    }

}
