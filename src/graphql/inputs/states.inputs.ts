import { Field, InputType, Int } from "type-graphql";
import { Country } from "../../entity/Country";
import { State } from "../../entity/State";
import { CountryInput } from "./country.inputs";

@InputType()
export class StateInput implements Partial<State> {
    @Field(type => Int, {nullable: true})
    id?: number;

    @Field({nullable: true})
    name?: string;
 
    @Field(type => CountryInput,  {nullable: true})
    countries?: Country;
}
