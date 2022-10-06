import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import {Group} from "./group";


@Entity({ name: "Tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'text'})
  desc!: string;

  @Column({type: 'text'})
  state!: string;

  @Column({type: 'text'})
  prazo!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @ManyToOne(() => Group, group => group.tasks, {
    eager: true,
    onDelete: "CASCADE"
  })
  group: Group
}