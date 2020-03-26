import { Field, InputType, Int } from "type-graphql";
import { Customer } from "../../entity/Customer";
import { Address } from "../../entity/Address";
import { AddressInputs } from "./address.inputs";

@InputType()
export class CustomerInput implements Partial<Customer> {
    @Field(type => Int, {nullable: true})
    id?: number;

    @Field({nullable: true})
    first_Name?: string;

    @Field({nullable: true})
    last_Name?: string;

    @Field({nullable: true})
    email?: string;

    @Field(type => [AddressInputs], {nullable: true})
    address: Address[];

}
