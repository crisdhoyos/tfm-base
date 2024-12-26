import {
  Entity,
  PrimaryColumn
} from 'typeorm';

@Entity('audio_category')
export class AudioCategory {
  @PrimaryColumn({ name: 'audio_id', type: 'bigint' })
  audioId: number;

  @PrimaryColumn({ name: 'category_id', type: 'bigint' })
  categoryId: number;

  // @ManyToOne(() => Audio, (audio) => audio.audioCategories, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'audio_id' })
  // audio: Audio;

  // @ManyToOne(() => Category, (category) => category.audioCategories, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'category_id' })
  // category: Category;

}
