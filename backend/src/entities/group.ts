import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Task} from './tasks'

@Entity({ name: "Grupos" })
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'text'})
  title!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;
  
  @OneToMany(() => Task, (task) => task.group)
  tasks: Task[]
}