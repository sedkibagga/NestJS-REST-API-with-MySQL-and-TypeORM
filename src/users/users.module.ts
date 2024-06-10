import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from 'src/typeorm/entities/Profil';
import { Post } from 'src/typeorm/entities/Post';
@Module({
  imports: [
    TypeOrmModule.forFeature([User , Profil , Post]), 
  ], 

  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
