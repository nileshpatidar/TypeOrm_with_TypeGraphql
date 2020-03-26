import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Address } from "./Address";
import { City } from "./City";
import { Country } from "./Country";
import { type } from "os";

@Entity("state")
@ObjectType()
export class State {

    @PrimaryGeneratedColumn()
    @Field(() => Int,{nullable:true}) // int define because for integer value of id 
    id: number;

    @Column()
    @Field({nullable:true})
    name: string;

    @CreateDateColumn({type: 'timestamp'})
    @Field({nullable: true})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;

    @OneToMany(type => City, city => city.state, {nullable: true})
    @Field(type => [City], {nullable: true})
    city: City[];

    @ManyToOne(type => Country, countries => countries.state, {nullable: true})
    @Field(type => Country, {nullable: true})
    @JoinColumn({name: "country_id"})
    countries: Country;
   
    @OneToMany(type => Address, address => address.country)
    address: Address[];

}
