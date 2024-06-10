import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post as PostMethod, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { Profil } from 'src/typeorm/entities/Profil';
import { CreateuserPostDto } from './dtos/CreateuserPost.dto';
import { Post } from 'src/typeorm/entities/Post';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
     async  getUsers() { 
         const users : User[] = await this.usersService.getUsers();
        return users;
    }

    @PostMethod()
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<User> {

      const user : User =  await this.usersService.createUser(createUserDto); 
      return user; 
    } 

    @Put(':id')
    async updateUser(@Body() createUserDto: CreateUserDto, @Param('id' , ParseIntPipe) id: number) : Promise<User> {
        const user : User =  await this.usersService.updateUser(id, createUserDto); 
        return user; 
    } 

    @Get(':id') 
    async getUserById(@Param('id' , ParseIntPipe) id: number) : Promise<User> {
        const user : User =  await this.usersService.getUserById(id); 
        return user; 
    } 

    @Delete(':id') 
    async deleteUser(@Param('id' , ParseIntPipe) id: number) : Promise<User[]> {
        const user : User[] =  await this.usersService.deleteUser(id); 
        return user; 
    } 

    @PostMethod(':id/profile')
    async createUserProfile(@Body() createUserProfileDto: CreateUserProfileDto, @Param('id' , ParseIntPipe) id: number) : Promise<User> {
        const user : User =  await this.usersService.createUserProfile(createUserProfileDto, id); 
        return user; 
    }
   
 @Get(':id/profile')
    async getProfileById(@Param('id' , ParseIntPipe) id: number) : Promise<Profil> {
        const profil : Profil =  await this.usersService.getProfileById(id); 
        return profil; 
    } 

    @PostMethod(':id/posts')
    async createPost(@Body() CreateuserPostDto: CreateuserPostDto, @Param('id' , ParseIntPipe) id: number) : Promise<Post>  {
       return await this.usersService.createUserPost(CreateuserPostDto, id);
}

}           

