import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Address } from "./Address";
import { Department } from "./Department";

@Entity("contacts")
@ObjectType()
export class Contacts {

    @PrimaryGeneratedColumn()
    @Field(() => Int,{nullable:true}) // int define because for integer value of id 
    id: number;

    @Column()
    @Field({nullable:true})
    PhoneNumber: number;

    @Column()
    @Field({nullable:true})
    email: string;

    @CreateDateColumn({type: 'timestamp'})
    @Field()
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;

    @ManyToMany(type => Address,address=> address.contacts, {nullable: true})
    address:Address
    
    // @ManyToOne(type => Department, department => department.contacts, {nullable: true})
    // @JoinColumn()
    // @Field(type => Department, {nullable: true})
    // department: Department;

}
