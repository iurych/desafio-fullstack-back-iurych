import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { getRounds, hash } from 'bcryptjs';
import { Contact } from './contact.entity';

@Entity('clients')
export class Client {
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

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const isHashed: number = getRounds(this.password);
      if (!isHashed) {
        this.password = await hash(this.password, 10);
      }
    }
  }
}
