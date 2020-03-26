
import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { getRepository, createQueryBuilder } from "typeorm";
import { Country } from "../../entity/Country";
import { CountryInput } from "../inputs/country.inputs";
import { Address } from "../../entity/Address";

@Resolver()
export class CountryResolver {
    @Query(() => [Country])
    async getcountry() {
        let contries = await getRepository(Country)
            .createQueryBuilder("country")
            .getMany();
    
        return contries;
    }


    @Mutation(() => Country)
    async addCountry(@Arg("data") data: CountryInput) {
        const CountryRepository = getRepository(Country);
        let inputObject = new Country();
        inputObject = Object.assign(inputObject, data);
        const errors = await validate(inputObject);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            let object = await CountryRepository.save(inputObject);
            console.log(object);
            return object;
        } catch (error) {
            return {
                status: "error",
                data: error,
                message: "error while save"
            };
        }
    }

    @Mutation(() => Country)
    async removeCountry(@Arg("id", () => Int) id: any) {
        const CountryRepository = getRepository(Country);
        const errors = await validate(id);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            // const address = new Address();
            //    const ifCountry = await address.find({id:id})
            const ifCountry = await getRepository(Address)
                .createQueryBuilder("address")
                .where('address.country= :id', { id: id })
                .getMany();

            if ((await ifCountry).length) {
                return {
                    status: "error",
                    data: [],
                    message: `confict You cant remove if Country id use in another data total found -: ${(await ifCountry).length}`
                }
            }
            // let object = await CountryRepository.createQueryBuilder()
            //     .where({ id: id })
            //     .softDelete()
            var object=   await CountryRepository.softDelete(id);

            return object;
        } catch (error) {
            return {
                status: "error",
                data: error,
                message: "error while save"
            };
        }
    }
}