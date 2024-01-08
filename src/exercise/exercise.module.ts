import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), CategoryModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
