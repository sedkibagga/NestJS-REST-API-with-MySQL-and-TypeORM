import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profil } from './typeorm/entities/Profil';
import { Post } from './typeorm/entities/Post';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', //if your databse not in your localhost you should change it to your ip
    port: 3306,
    username: 'root',
    password: 'your password',
    database: 'nestjs_sql_tutorial',
    entities: [User , Profil , Post],
    synchronize: true,
    
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
