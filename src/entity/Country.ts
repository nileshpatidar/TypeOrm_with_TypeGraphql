import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { State } from "./State";
import { Address } from "./Address";

@Entity("country")
@ObjectType()
export class Country {

    @PrimaryGeneratedColumn()
    @Field(() => Int ,{nullable: true}) // int define because for integer value of id 
    id: number;

    @Column()
    @Field({nullable: true})
    name: string;

    @CreateDateColumn({type: 'timestamp'})
    @Field({nullable: true})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;

  
    @OneToMany(type => State, state => state.countries, {nullable: true})
    @Field(type => [State], {nullable: true})
    state: State[];

    @OneToMany(type => Address, address => address.country)
    address: Address[];


}
