import { Arg, Resolver, Query, Int, Mutation, ObjectType } from "type-graphql";
import { AddressInputs } from "../inputs/address.inputs";
import { getRepository, createQueryBuilder } from "typeorm";
import { Address } from "../../entity/Address";
import { validate } from "class-validator";
import { Customer } from "../../entity/Customer";
import CommonResponse from "../responce/commonResponce";

@ObjectType()
class AddressResponse extends CommonResponse([Address]) {
    // you can add more fields here if you need
}

@Resolver()
export class AddressResolver {

    @Mutation(() => AddressResponse)
    async addCustomerAddress(@Arg('data') data: AddressInputs) {
        try {
            const addressRepository = getRepository(Address)
            // let inputs = await this.addressRepository.findOne(id);
            let inputData = new Address();
            inputData = Object.assign(inputData, data);
            const errors = await validate(inputData);
            if (errors.length > 0) {
                console.log("error validate", errors);
                throw new Error(errors.map(e => {
                    return (Object.values(e.constraints))
                }).join(", "));
            }
            let addresses = await addressRepository.save(inputData);
            console.log(addresses);
            
            return {
                status: "success",
                data: [addresses],
                message: "successfully load data"
            };
        } catch (error) {
            console.log(error);
            return {
                status: "error",
                data: error,
                message: "error while proccessing  "
            };
        }
    }

    @Query(() => AddressResponse)
    async getAddress() {
        // const CustomerAddress = await getRepository(Address)
        // .createQueryBuilder('address')
        // .getMany()
        const CustomerAddress = await getRepository(Address).find({ relations: ["country", "state", "city", "contacts"] })
        console.log(CustomerAddress);
        return {
            status: "success",
            data: CustomerAddress,
            message: "successfully load data"
        };
    }

    @Mutation(() => AddressResponse)
    async Updateaddress(@Arg("data") data: AddressInputs) {
        try {
            const addressrepo = getRepository(Address)
            let inputObject = new Address();
            inputObject = Object.assign(inputObject, data);
            const errors = await validate(inputObject);
            if (errors.length > 0) {
                console.log("error on addressresolver updateaddress", errors);
                throw new Error(errors.map(e => {
                    return (Object.values(e.constraints))
                }).join(", "));
            }
            let object = await addressrepo.save(inputObject);
            return {
                status: "success",
                data: object,
                message: "successfully update data"
            };
        } catch (error) {
            console.log(error);
            return {
                status: "error",
                data: error,
                message: "error when update"
            };
        }
    }

    @Query(() => AddressResponse)
    async getAddressWithCID(@Arg("id", () => Int) id: any) {
        const CustomerAddress = await getRepository(Address)
            .createQueryBuilder('address')
            .where(id)
            .getMany()

        return {
            status: "success",
            data: CustomerAddress,
            message: "successfully load data"
        };

    }

    @Mutation(() => AddressResponse)
    async removeAddress(@Arg("id", () => Int) id: any) {
        const AddressRepository = getRepository(Address);
        const errors = await validate(id);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            const ifAddress = getRepository(Customer).find(id)
            if ((await ifAddress).length) {
                console.log("lenght of address  in customer", (await ifAddress).length);

                return {
                    status: "error",
                    data: [],
                    message: `confict You cant remove if address id use in another data total found -:}`
                };
            }
            // let object = await AddressRepository.createQueryBuilder()
            //     .where({ id: id })
            //     .softDelete()
            var object = await AddressRepository.softDelete(id);
            return {
                status: "success",
                data: object,
                message: `successfully removed address`
            };
    
        } catch (error) {
            return {
                status: "error",
                data: error,
                message: "error while save"
            };
        }
    }

}