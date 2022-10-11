import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import {Group} from "./group";

@Entity({ name: "Tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'text'})
  desc: string;

  @Column({type: 'text'})
  state: string;

  @Column({type: 'text'})
  prazo: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Group, group => group.tasks, {
    eager: true,
    onDelete: "CASCADE"
  })
  group: Group

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}