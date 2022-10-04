import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: "Grupos" })
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;
}