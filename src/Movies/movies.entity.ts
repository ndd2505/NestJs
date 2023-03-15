import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  poster: string;

  @Column({ default: true })
  length: number;

  @Column()
  released_date?: Date;

  @Column()
  rating: number;
}
