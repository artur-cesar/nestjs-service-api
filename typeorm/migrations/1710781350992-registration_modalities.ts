import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RegistrationModalities1710781350992 implements MigrationInterface {
    private readonly tableName: string = "registrations_modalities_modalities";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: this.tableName,
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    default: "uuid_generate_v4()"
                },
                {
                    name: "registrationsId",
                    type: "uuid",
                    foreignKeyConstraintName: "fk_registration_modalities_registration_id",
                },
                {
                    name: "modalitiesId",
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
        queryRunner.dropTable(this.tableName, true)
    }
}
