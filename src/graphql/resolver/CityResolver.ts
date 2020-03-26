
import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { getRepository } from "typeorm";
import { City } from "../../entity/City";
import { State } from "../../entity/State";
import { CityInput } from "../inputs/city.inputs";
import { User } from "../../entity/User";
import { Address } from "../../entity/Address";

@Resolver()
export class CityResolver {
    @Query(() => [City])
    async getCity() {
        // const citys = await getRepository(City)
        //     .createQueryBuilder("city")
        //     .leftJoinAndSelect("state","states")
        //     .getMany();
        const citys = await getRepository(City).find({ relations: ["state"] })
        console.log(citys);

        return citys
    }

    @Mutation(() => City)
    async addCity(@Arg("data") data: CityInput) {
        const CityRepository = getRepository(City);
        let inputObject = new City();
        inputObject = Object.assign(inputObject, data);
        const errors = await validate(inputObject);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            let cityobject = await CityRepository.save(inputObject);
            return cityobject;
        } catch (error) {
            return {
                status: "error",
                data: error,
                message: "error while save"
            };
        }
    }

    @Mutation(() => City)
    async removeCity(@Arg("id", () => Int) id: any) {
        const CityRepository = getRepository(City);
        const errors = await validate(id);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            const ifcity = await getRepository(Address)
                .createQueryBuilder("address")
                .where('address.city= :id', { id: id })
                .getMany();

            console.log("city length find in address", ifcity.length);

            //    const ifcity = CityRepository.find({where:{id:id}})
            if (ifcity.length) {
                return {
                    status: "error",
                    data: [],
                    message: `confict You cant remove if city id use in another data total found -: ${(await ifcity).length}`
                }
            }
            // let object = await CityRepository.createQueryBuilder()
            //     .where({ id: id })
            //     .softDelete()
            var object = await CityRepository.softDelete(id);
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