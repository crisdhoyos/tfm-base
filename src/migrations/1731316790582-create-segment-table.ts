import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSegmentTable1731316790582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'audio_segment',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'segment_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'seek',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'start',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'end',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tokens',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'temperature',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'avg_logprob',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'compression_ratio',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'no_speech_prob',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('audio_segment');
  }
}
