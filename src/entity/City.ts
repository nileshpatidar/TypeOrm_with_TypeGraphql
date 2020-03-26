import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Address } from "./Address";
import { State } from "./State";

@Entity("city")
@ObjectType()
export class City {

    @PrimaryGeneratedColumn()
    @Field(() => Int) // int define because for integer value of id 
    id: number;

    @Column()
    @Field({nullable:true})
    name: string;

    @ManyToOne(type => State, state => state.city, {nullable: true})
    @Field(type => State, {nullable: true})
    @JoinColumn({name :"state_id"})
    state: State;
    
    
    @CreateDateColumn({type: 'timestamp'})
    @Field()
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;
    
    @OneToMany(type => Address, address => address.country)
    address: Address[];

    

}
