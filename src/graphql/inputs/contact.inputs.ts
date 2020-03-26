import {Field, InputType, Int} from "type-graphql";
import { Contacts } from "../../entity/Contacts";
import { Address } from "../../entity/Address";
import { type } from "os";
import { AddressInputs } from "./address.inputs";
 
@InputType()
export class ContactInput implements Partial<Contacts> {
    @Field(type => Int, {nullable: true})
    id?: number;

    @Field({nullable: true})
    PhoneNumber?: number;

    @Field({nullable: true})
    email?: string;
    
    @Field(type=>AddressInputs, {nullable:true})
    address?:Address

}
