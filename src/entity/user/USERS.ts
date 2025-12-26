import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: 'USERS' })
export class UsersEntity {

  @PrimaryColumn({ name: 'ID' })
  id: number

  @Column({ name: 'EMAIL' })
  email: string

  @Column({ name: 'PASSWORD' })
  password: string

  @Column({ name: 'NAME' })
  name: string

  @Column({ name: 'CREATIONDATE' })
  creationDate: string

}