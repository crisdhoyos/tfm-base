import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class FkSegmentsAudio1731347515539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'audio_segment',
      new TableColumn({
        name: 'audio_id',
        type: 'bigint',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'audio_segment',
      new TableForeignKey({
        name: 'FK_audio_segment_audio',
        columnNames: ['audio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'audio',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('audio_segment', 'FK_audio_segment_audio');
    await queryRunner.dropColumn('audio_segment', 'audio_id');
  }
}
