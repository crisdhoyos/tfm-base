import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AudioSegment } from './audio-segment.entity';
import { Category } from './category.entity';

@Entity('audio')
export class Audio {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column('varchar', { name: 'name', nullable: true })
  name?: string;

  @Column('varchar', { name: 'link', nullable: true })
  link?: string;

  @Column('varchar', { name: 'youtube_id', nullable: true })
  youtubeId?: string;

  @Column('text', { name: 'transcription', nullable: false })
  transcription: string;

  @Column('varchar', { name: 'keywords', nullable: true })
  keywords?: string; // lista separada por comas

  @Column('varchar', { name: 'description', nullable: true })
  description?: string; // texto descriptivo creado a partir de la info obtenida

  @Column('text', { name: 'tokens', nullable: true })
  tokens?: string; // arreglo del vector de la descripción (se puede usar luego en la búsqueda)

  @Column('float8', { name: 'duration' })
  duration: number;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'NOW()' })
  updatedAt?: string;

  // ------- Relations -------

  @OneToMany(() => AudioSegment, (audioSegment) => audioSegment.audio)
  audioSegments: AudioSegment[];

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'audio_category', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'audio_id', // Columna que referencia a Audio
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id', // Columna que referencia a Category
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
