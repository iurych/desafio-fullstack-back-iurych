import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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

  @Column({ type: 'varchar', length: 60 })
  fullName: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
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
