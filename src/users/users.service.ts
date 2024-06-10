import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CreateUserParams } from 'src/utils/types';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { Profil } from 'src/typeorm/entities/Profil';
import { CreateUserProfileParams } from 'src/utils/types';
import { CreateUserPostParams } from 'src/utils/types';
import { Post } from 'src/typeorm/entities/Post';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Profil) private profilRepository: Repository<Profil> , @InjectRepository(Post) private postRepository: Repository<Post>) { }

    async createUser(user: CreateUserParams) {
        if (!user.username || !user.password) {
            throw new HttpException('Username and password are required', 400);
        }

        const existingUser = await this.userRepository.findOne({ where: { username: user.username } });
        if (existingUser) {
            throw new HttpException('Username already exists', 400);
        }
        try {
            const newUser = await this.userRepository.create({ ...user, createdAt: new Date() });
            return this.userRepository.save(newUser);
        } catch (error) {
            throw new HttpException('Failed to create user', 500);
        }
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find({relations: ["profil" , "posts"]});
    }

    async updateUser(id: number, userUpdated: CreateUserParams): Promise<User> {

        if (!userUpdated.username) {
            throw new HttpException('Username is required', 400);
        }
        const existingUser = await this.userRepository.findOne({ where: { id: id } });
        if (!existingUser) {
            throw new HttpException('User not found', 404);
        } else {
            try {
                await this.userRepository.update({ id: id }, { ...userUpdated, createdAt: new Date() });
                const updatedUser: User = await this.userRepository.findOne({ where: { id: id } });
                return updatedUser;

            } catch (error) {
                throw new HttpException('Failed to update user', 500);
            }
        }


    } 

    async getUserById (id : number) : Promise<User> { 
        const existingUser = await this.userRepository.findOne({ where: { id: id } }); 
        if (!existingUser) {
            throw new HttpException('User not found', 404);
        } else {
            return existingUser;
        }

    }  

    async deleteUser(id: number): Promise<User[]> {
        const existingUser = await this.userRepository.findOne({ where: { id: id } });
        if (!existingUser) {
            throw new HttpException('User not found', 404);
        } else {
            try {
                await this.userRepository.delete({ id: id }); 
                return this.getUsers() ; 
            } catch (error) {
                throw new HttpException('Failed to delete user', 500);
            }
        }
    } 
   
    async createUserProfile(userProfile: CreateUserProfileParams, id: number) : Promise<User> {
            const existingUser: User = await this.userRepository.findOne({ where: { id: id } });
            if (!existingUser) { 
                throw new HttpException('User not found', 404);
        
            } else {
               const newProfile : Profil = await this.profilRepository.create(userProfile);
               const saveProfile : Profil = await this.profilRepository.save(newProfile);
               existingUser.profil = saveProfile; 
               return this.userRepository.save(existingUser);
            }


}  

async getProfileById (id : number) : Promise<Profil> { 
    const existingProfile = await this.profilRepository.findOne({ where: { id: id } }); 
    if (!existingProfile) {
        throw new HttpException('Profile not found', 404);
    } else {
        return existingProfile;
    }

}  

async createUserPost(userPost: CreateUserPostParams, id: number): Promise<Post> {
    const existingUser = await this.userRepository.findOne({ where: { id: id }, relations: ["posts"] });
    if (!existingUser) {
        throw new HttpException('User not found', 404);
    } else {
        try {
            const newUserPost = this.postRepository.create({
                ...userPost,
                user: existingUser,  
            });
            return this.postRepository.save(newUserPost);
        } catch (error) {
            throw new HttpException('Failed to create post', 500);
        }
    }
}

}
