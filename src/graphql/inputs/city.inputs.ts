import {Field, InputType, Int} from "type-graphql";
import { City } from "../../entity/City";
import { StateInput } from "./states.inputs";
import { State } from "../../entity/State";

@InputType()
export class CityInput implements Partial<City> {
    @Field(type => Int, {nullable: true})
    id?: number;

    @Field({nullable: true})
    name?: string;

    @Field(type => StateInput, {nullable: true})
    state?: State;

}
