import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const newExercise = this.exerciseRepository.create(createExerciseDto as unknown as DeepPartial<Exercise>);
    return await this.exerciseRepository.save(newExercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({ where: { id: id } });
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
