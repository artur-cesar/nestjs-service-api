import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Student1710000675194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "students",
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
                    name: "phone",
                    type: "varchar",
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
        await queryRunner.dropTable("students")
    }

}
