import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Address } from "./Address";

@Entity("customers")
@ObjectType()
export class Customer {

    @PrimaryGeneratedColumn()
    @Field(() => Int,{nullable:true}) // int define because for integer value of id 
    id: number;

    @Column({nullable:true})
    @Field({nullable:true})
    first_Name: string;

    @Column({nullable:true})
    @Field({nullable:true})
    last_Name: string;

    @Column({nullable:true})
    @Field({nullable:true})
    email: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field({nullable:true})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    @Field({ nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @ManyToMany(type => Address, { nullable: true, persistence: true })
    @JoinTable({
        name: 'customers_has_address',
    })
    @Field(type => [Address], {nullable: true})
    address: Address[]


}
