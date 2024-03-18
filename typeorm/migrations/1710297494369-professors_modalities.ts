import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProfessorsModalities1710297494369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "professor_modalities_rid",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    default: "uuid_generate_v4()"
                },
                {
                    name: "modalityId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_modality_professsor_modality_id"
                },
                {
                    name: "professorId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_modality_professsor_professor_id"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "NOW()"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "NOW()"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("professor_modalities_rid", true)
    }

}
