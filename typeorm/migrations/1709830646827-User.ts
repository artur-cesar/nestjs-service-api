import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1709830646827 implements MigrationInterface {
    private readonly tableName: string = "users";
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
                    name: "email",
                    type: "text"
                },
                {
                    name: "password",
                    type: "text"
                },
                {
                    name: "birthAt",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "role",
                    type: "int",
                    default: 1
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
        await queryRunner.dropTable(this.tableName, true)
    }

}
