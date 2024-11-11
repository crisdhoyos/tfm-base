import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Audio } from './audio.entity';

@Entity('audio_segment')
export class AudioSegment {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'bigint', name: 'audio_id' })
  audioId: number;

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

  // ------- Relations -------

  @ManyToOne(() => Audio, (audio) => audio.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'audio_id', referencedColumnName: 'id' })
  audio: Audio;
}
