import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveTopicsColumn1734101836546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('audio', 'topics');
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'audio',
        new TableColumn({
          name: 'topics',
          type: 'varchar',
          isNullable: true,
        }),
      );
    }

}
