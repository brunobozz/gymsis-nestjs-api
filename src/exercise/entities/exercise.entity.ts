import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'exercise' })
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;
}
