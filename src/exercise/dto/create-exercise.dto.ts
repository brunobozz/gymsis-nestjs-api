import { IsString, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayNotEmpty()
  categoryIds: number[];
}
