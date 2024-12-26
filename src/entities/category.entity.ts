import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;


  // ------- Relations -------
  
}
