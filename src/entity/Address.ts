import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, JoinTable, ManyToMany} from "typeorm";
import { Contacts } from "./Contacts";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";
import { Country } from "./Country";
import { State } from "./State";
import { City } from "./City";

@Entity()
@ObjectType()

export class Address {
    @PrimaryGeneratedColumn()
    @Field(() => Int,{nullable:true})
    id: number;

    @Column({length: 100, nullable: true})
    @Field({nullable: true})
    address_type: string;
   
    @Column({nullable: true})
    @Field({nullable: true})
    pincode:number;

    @Column({nullable: true})
    @Field({nullable: true})
    email: string;

    @Column({nullable: true})
    @Field({nullable: true})
    phone: number;
 
    @CreateDateColumn({type: 'timestamp'})
    @Field()
    created_at: Date;

    @UpdateDateColumn({nullable: true, type: 'timestamp'})
    @Field({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true, type: 'timestamp'})
    deleted_at: Date;
 
    @ManyToOne(type => Country, country => country.address, {nullable: true})
    @JoinColumn()
    @Field(type => Country, {nullable: true})
    country: Country;

    @ManyToOne(type => State, state => state.address, {nullable: true})
    @JoinColumn()
    @Field(type => State, {nullable: true})
    state: State;

    @ManyToOne(type => City, city => city.address, {nullable: true})
    @JoinColumn()
    @Field(type => City, {nullable: true})
    city: City;

    @ManyToMany(type => Contacts, contact => contact.address, {nullable: true})
    @JoinTable({name: 'address_has_contacts'})
    @Field(type =>[Contacts], {nullable: true})
    contacts: Contacts[];
}
