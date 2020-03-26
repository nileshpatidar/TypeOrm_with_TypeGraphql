import { InputType, Field, Int } from "type-graphql";
import { Address } from "../../entity/Address";
import { Country } from "../../entity/Country";
import { Stats } from "fs";
import { State } from "../../entity/State";
import { City } from "../../entity/City";
import { Customer } from "../../entity/Customer";
import { StateInput } from "./states.inputs";
import { CountryInput } from "./country.inputs";
import { CityInput } from "./city.inputs";
import { Contacts } from "../../entity/Contacts";
import { ContactInput } from "./contact.inputs";

@InputType()
export class AddressInputs implements Partial<Address> {
    @Field(type => Int,{nullable:true})
    id?:number

    @Field({nullable: true})
    address_type?:string

    @Field({nullable: true})
    email?:string

    @Field({nullable: true})
    pincode?:number

    @Field({nullable: true})
    phone?:number

    @Field(type => CountryInput, {nullable: true})
    country?: Country;

    @Field(type => StateInput, {nullable: true})
    state?: State;

    @Field(type => CityInput, {nullable: true})
    city?: City;

    @Field(type=>[ContactInput],{nullable:true})
    contacts?:Contacts[]
    
    
    
}