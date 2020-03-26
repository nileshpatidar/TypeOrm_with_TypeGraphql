
import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { getRepository } from "typeorm";
import { State } from "../../entity/State";
import { StateInput } from "../inputs/states.inputs";
import { Address } from "../../entity/Address";
import { relative } from "path";
import { City } from "../../entity/City";

@Resolver()
export class StateResolver {
    @Query(() => [State])
    async getState() {
        // const states = await getRepository(State)
        //     .createQueryBuilder("state")
        //     // .leftJoinAndSelect("city","cites")
        //     .getMany();
        const states = await getRepository(State).find({relations:["city","countries"]})
        return states
        
    }

    @Mutation(() => State)
    async addState(@Arg("data") data: StateInput) {
        const StateRepository = getRepository(State);
        let inputObject = new State();
        inputObject = Object.assign(inputObject, data);
        const errors = await validate(inputObject);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            let object = await StateRepository.save(inputObject);
            return await StateRepository.findOne(object.id,{
                relations:["countries"]
            });
        } catch (error) {
            return {
                status: "error",
                data: error,
                message: "error while save"
            };
        }
    }

    @Mutation(() => State)
    async removeState(@Arg("id", () => Int) id: any) {
        const StateRepository = getRepository(State);
        const errors = await validate(id);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {

            const ifinAddress = await getRepository(Address)
                .createQueryBuilder("address")
                .where('address.state= :id', { id: id })
                .getMany();

                const ifState = await getRepository(City).find(id)
                
            //    const ifState = StateRepository.find({where:{id:id}})
            if (ifState.length || ifinAddress.length) {
                return {
                    status: "error",
                    data: [],
                    message: `confict You cant remove if State id use in another data total found -: ${(ifState).length}`
                }
            }
            // Delete a entity
              var object=   await StateRepository.softDelete(id);

              // And You can restore it using restore;
            // await StateRepository.restore(1);
        
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
}