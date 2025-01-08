import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddYoutubeId1736225320896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'audio',
      new TableColumn({
        name: 'youtube_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('audio', 'youtube_id');
  }
}
