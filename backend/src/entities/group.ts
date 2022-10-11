import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
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

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}