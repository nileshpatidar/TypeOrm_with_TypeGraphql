import { Field, InputType, Int } from "type-graphql";
import { Country } from "../../entity/Country";

@InputType()
export class CountryInput implements Partial<Country> {
    @Field(type => Int, {nullable: true})
    id?: number;

    @Field({nullable: true})
    name?: string;

}

