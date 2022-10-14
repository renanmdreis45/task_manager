import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import {Group} from "./group";

@Entity("Tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'text'})
  desc: string;

  @Column({type: 'text'})
  prazo: string;

  @Column({type: 'text'})
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  group_id: string;

  @ManyToOne(() => Group, group => group.tasks, {
    eager: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "group_id"})
  group: Group

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}