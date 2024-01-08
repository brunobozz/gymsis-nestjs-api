import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  
  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const { name, categoryId } = createExerciseDto;

    // Encontre a categoria associada
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Crie o exercício associando-o à categoria
    const newExercise = this.exerciseRepository.create({ name, category });
    return await this.exerciseRepository.save(newExercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({ relations: ['category'] }); 
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const existingExercise = await this.findOne(id);
    this.exerciseRepository.merge(existingExercise, updateExerciseDto as unknown as DeepPartial<Exercise>);
    return await this.exerciseRepository.save(existingExercise);
  }

  async remove(id: number): Promise<void> {
    const exerciseToRemove = await this.findOne(id);
    await this.exerciseRepository.remove(exerciseToRemove);
  }
}
