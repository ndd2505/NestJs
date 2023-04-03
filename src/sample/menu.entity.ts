import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  parent_code: string;

  @Column({ nullable: true })
  permission_code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  ordering: number;

  @Column({ nullable: true })
  visible_status: number;

  @Column({ nullable: true })
  status: number;

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  created_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ name: 'updated_at' })
  updated_by: string;

  @Column({ nullable: true })
  create_source: string;

  @UpdateDateColumn({ nullable: true })
  update_ts: string;
}
