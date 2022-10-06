import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import {Task} from './tasks'

@Entity({ name: "Groups" })
export class Group {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'text'})
  title: string;

  @CreateDateColumn()
  created_at: Date;
  
  @OneToMany(() => Task, (task) => task.group)
  tasks: Task[]
}