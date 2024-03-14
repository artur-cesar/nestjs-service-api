import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Professors1710294983499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "professors",
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
        queryRunner.dropTable("professors")
    }

}
