import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profil } from "./Profil";
import { Post } from "./Post";
@Entity({name : 'users'}) 
export class User { 
    @PrimaryGeneratedColumn({type : 'bigint'}) 
    id : number  ; 

    @Column({unique : true}) 
    username : string ; 

    @Column() 
    password : string ; 

    @Column() 
    createdAt : Date ; 

    @Column({nullable : true}) 
    authStrategy : string ;
    @OneToOne (() => Profil) 
    @JoinColumn() 
    profil : Profil
    @OneToMany(() => Post, (post) => post.user) //indique que l'entité User a une relation "un-à-plusieurs" avec l'entité Post.
    posts : Post[] ;

}