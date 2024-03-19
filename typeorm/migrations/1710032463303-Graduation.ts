import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Graduation1710032463303 implements MigrationInterface {
    private readonly tableName: string = "graduations"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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
                    name: "name",
                    type: "text"
                },
                {
                    name: "order",
                    type: "int",
                    unsigned: true,
                    isNullable: true
                },
                {
                    name: "modalityId",
                    type: 'uuid',
                    foreignKeyConstraintName: "graduation_modality_fk"
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

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true)
    }

}
