import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name : 'user_profils'})
export class Profil {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    firstName : string ; 
    @Column() 
    lastName : string ;
    @Column()
    age : number ;
    @Column()
    dob : string;  

    // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date;
}