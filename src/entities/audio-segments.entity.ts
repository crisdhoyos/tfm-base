import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('audio_segments')
export class AudioSegments {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column('bigint', { name: 'segment_id' })
  segmentId: number;

  @Column('float8', { name: 'seek' })
  seek: number;

  @Column('float8', { name: 'start' })
  start: number;

  @Column('float8', { name: 'end' })
  end: number;

  @Column('varchar', { name: 'text', nullable: true })
  text?: string; // transcripcion

  @Column('varchar', { name: 'tokens', nullable: true })
  tokens?: string; // arreglo separado por comas

  @Column('float8', { name: 'temperature' })
  temperature: number;

  @Column('float8', { name: 'avg_logprob' })
  avgLogprob: number;

  @Column('float8', { name: 'compression_ratio' })
  compressionRatio: number;

  @Column('float8', { name: 'no_speech_prob' })
  noSpeechProb: number;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'NOW()' })
  updatedAt?: string;
}
