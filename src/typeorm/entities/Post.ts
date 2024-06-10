import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@Entity({name : 'user_posts'}) 
export class Post {

    @PrimaryGeneratedColumn()   
    id : number  ;

    @Column()
    title : string ;

    @Column()
    description : string ;
    @ManyToOne(() => User, (user) => user.posts) //indique que l'entité Post a une relation "plusieurs-à-un" avec l'entité User.
    user : User ;
}