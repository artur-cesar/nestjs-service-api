import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RegistrationModalities1710781350992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "registration_modalities_rid",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    default: "uuid_generate_v4()"
                },
                {
                    name: "registrationId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_registration_modalities_registration_id"
                },
                {
                    name: "modalityId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_registration_modalities_modality_id"
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
        queryRunner.dropTable("registration_modalities_rid", true)
    }

}
