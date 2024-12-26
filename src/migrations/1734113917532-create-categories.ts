import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategories1734113917532 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crea la tabla de categorias
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
      true,
    );

    // Crea la tabla audio_category
    await queryRunner.createTable(
      new Table({
        name: 'audio_category',
        columns: [
          {
            name: 'audio_id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'category_id',
            type: 'bigint',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    // Agrega la FK del audio
    await queryRunner.createForeignKey(
      'audio_category',
      new TableForeignKey({
        columnNames: ['audio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'audio',
        onDelete: 'CASCADE',
      }),
    );

    //  Agrega la FK de la categoria
    await queryRunner.createForeignKey(
      'audio_category',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Elimina las FK
    const table = await queryRunner.getTable('audio_category');
    const audioForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('audio_id') !== -1);
    const categoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
    if (audioForeignKey) {
      await queryRunner.dropForeignKey('audio_category', audioForeignKey);
    }
    if (categoryForeignKey) {
      await queryRunner.dropForeignKey('audio_category', categoryForeignKey);
    }

    // Elimina las tablas
    await queryRunner.dropTable('audio_category');
    await queryRunner.dropTable('category');
  }

}
