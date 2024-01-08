import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//MODULES
import { ExerciseModule } from './exercise/exercise.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://etcqaiam:6RIjohQtWq3HgTbdnHdaya0Eo3kLtYPQ@babar.db.elephantsql.com/etcqaiam',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ExerciseModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
