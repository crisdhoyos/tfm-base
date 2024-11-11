import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('audios')
export class Audios {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column('varchar', { name: 'name', nullable: true })
  name?: string;

  @Column('varchar', { name: 'link', nullable: true })
  link?: string;

  @Column('varchar', { name: 'transcription', nullable: false })
  transcription: string;

  @Column('varchar', { name: 'keywords', nullable: true })
  keywords?: string; // lista separada por comas

  @Column('varchar', { name: 'topics', nullable: true })
  topics?: string; // lista separada por comas

  @Column('varchar', { name: 'description', nullable: true })
  description?: string; // texto descriptivo creado a partir de la info obtenida

  @Column('float8', { name: 'duration' })
  duration: number;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'NOW()' })
  updatedAt?: string;
}
