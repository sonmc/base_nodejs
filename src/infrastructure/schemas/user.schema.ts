import { Entity, Column } from "typeorm";
import { BaseSchema } from "./zbase.schema";

@Entity()
export class User extends BaseSchema {
  @Column({ unique: true })
  email: string = "";

  @Column()
  firstName: string = "";

  @Column()
  username: string = "";

  @Column()
  password: string = "";
}
