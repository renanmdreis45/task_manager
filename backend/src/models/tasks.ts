import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: "task" })
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  desc!: string;

  @Column()
  state!: string;

  @Column()
  prazo!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;
}