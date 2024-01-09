import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from 'src/exercise/entities/exercise.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  code: string;

  @ManyToMany(() => Exercise, exercise => exercise.categories)
  @JoinTable()
  exercises: Exercise[];
}
