import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import { Length } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { Contacts } from "./Contacts";

@Entity("departments")
@ObjectType()
export class Department {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ length: 200 })
    @Length(4, 200)
    @Field()
    department_name: string;

    @Column({ length: 255, nullable: true })
    @Field({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field()
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    @Field({ nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Field()
    deleted_at: Date;
 
    // @OneToMany(type => Contacts, contact => contact.department, { nullable: true })
    // contacts: Contacts;
}