import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn() // Marks 'id' as the primary key, and it auto-increments
  id: number;

  @Column()
  username: string;

  @Column() // 'firstName' column, string, max 500 chars, not null
  email: string;

  @Column() // 'lastName' column, can be null
  password: string; // `?` in TypeScript means the property is optional
}
