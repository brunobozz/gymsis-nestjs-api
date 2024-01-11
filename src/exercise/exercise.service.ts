import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Like, Repository } from 'typeorm';
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
    const { name, categoryIds } = createExerciseDto;

    // Encontre as categorias associadas
    const categories = await this.categoryRepository.find({
      where: categoryIds.map((id) => ({ id })),
    });

    if (categories.length !== categoryIds.length) {
      // Alguma(s) categoria(s) não foi(ram) encontrada(s)
      throw new NotFoundException(`One or more categories not found`);
    }

    // Crie o exercício associando-o às categorias
    const newExercise = this.exerciseRepository.create({ name, categories });
    return await this.exerciseRepository.save(newExercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({ relations: ['categories'] });
  }

  async findByParams(catIds?: any, searchTerm?: string): Promise<Exercise[]> {
    const query: any = {};

    if (catIds) {
      // Filtrar por categorias se catIds estiver presente
      query.categories = catIds.map((id: any) => ({ id }));
    }

    if (searchTerm) {
      // Filtrar por nome se searchTerm estiver presente
      query.name = Like(`%${searchTerm}%`);
    }

    const exercises = await this.exerciseRepository.find({
      where: query,
      relations: ['categories'],
    });

    return exercises;
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: id },
      relations: ['categories'],
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const existingExercise = await this.findOne(id);

    // Atualiza as propriedades simples da entidade
    this.exerciseRepository.merge(
      existingExercise,
      updateExerciseDto as DeepPartial<Exercise>,
    );

    // Remove todas as associações many-to-many existentes
    await this.exerciseRepository
      .createQueryBuilder()
      .relation(Exercise, 'categories')
      .of(existingExercise)
      .remove(existingExercise.categories);

    // Adiciona as novas associações many-to-many
    if (
      updateExerciseDto.categoryIds &&
      updateExerciseDto.categoryIds.length > 0
    ) {
      const categoryIds = updateExerciseDto.categoryIds.map((id) => +id);
      const categories = await this.exerciseRepository.manager.find(Category, {
        where: categoryIds.map((id) => ({ id })),
      });
      existingExercise.categories = categories;
    }

    // Salva a entidade atualizada
    return await this.exerciseRepository.save(existingExercise);
  }

  async remove(id: number): Promise<void> {
    const exerciseToRemove = await this.findOne(id);
    // Remove a associação many-to-many na tabela de junção
    await this.exerciseRepository
      .createQueryBuilder()
      .relation(Exercise, 'categories')
      .of(exerciseToRemove)
      .remove(exerciseToRemove.categories);

    // Remove a entidade Exercise
    await this.exerciseRepository.remove(exerciseToRemove);
  }
}
