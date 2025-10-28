import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class Quote {
  @PrimaryGeneratedColumn() // Marks 'id' as the primary key, and it auto-increments
  id: number;

  @Column({ length: 500, nullable: false }) // 'firstName' column, string, max 500 chars, not null
  quote: string;

  @Column({ nullable: false }) // 'lastName' column, can be null
  author: string; // `?` in TypeScript means the property is optional
}
