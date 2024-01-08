import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, { eager: true }) // Muitos Exercícios pertencem a Uma Categoria
  @JoinColumn({ name: 'category_id' }) // Nome da coluna de chave estrangeira na tabela exercises
  category: Category;
}