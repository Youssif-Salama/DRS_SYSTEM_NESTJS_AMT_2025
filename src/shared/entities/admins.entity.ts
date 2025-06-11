import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 250, nullable: false, type: 'varchar' })
  name: string;
  @Column({
    type: 'enum',
    enum: ['admin', 'super_admin'],
    default: 'admin',
    nullable: false,
  })
  role: 'admin' | 'super_admin';
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({type:'boolean',default:false})
  isActive:boolean
}
