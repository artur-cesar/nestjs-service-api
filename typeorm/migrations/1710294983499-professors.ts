import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Professors1710294983499 implements MigrationInterface {
    private readonly tableName: string = "professors"
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
                    name: "name",
                    type: "text"
                },
                {
                    name: "gender",
                    type: "enum",
                    enum: ["MASC", "FEM", "NONE"]
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
