import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  fullName: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @CreateDateColumn({ type: 'date' })
  registeredAt?: Date | string;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date | string;

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date | string;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;
}
