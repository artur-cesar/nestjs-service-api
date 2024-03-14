import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class ModalityGraduation1710201600519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("graduations", new TableColumn({
            name: "modalityId",
            type: 'uuid',
            foreignKeyConstraintName: "modality_graduations_fk"
        }))

        await queryRunner.createForeignKey("graduations", new TableForeignKey({
            columnNames: ["modalityId"],
            referencedColumnNames: ["id"],
            referencedTableName: "modalities",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("graduations", "modalityId")
        await queryRunner.dropForeignKey("graduations", "modality_graduations_fk")
    }

}
