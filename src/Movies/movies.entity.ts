import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ default: true, nullable: true })
  length: number;

  @Column({ nullable: true })
  released_date: Date;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  crawl_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
