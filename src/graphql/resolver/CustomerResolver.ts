
import { validate } from "class-validator";
import { Arg, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getRepository, IsNull } from "typeorm";
import { Customer } from "../../entity/Customer";
import { CustomerInput } from "../inputs/Customer.input";
import CommonResponse from "../responce/commonResponce";

@ObjectType()
class CustomerResponse extends CommonResponse([Customer]) {
  // you can add more fields here if you need
}

@Resolver()
export class CustomerResolver {
  @Query(() => CustomerResponse)
  async customerWithId(@Arg("id", () => Int) id: any) {
    try {
      const customers = await getRepository(Customer).find({ where: [{ id :id },{deleted_at:IsNull() }], relations: ["address", "address.country", "address.city", "address.state"] })
     
      return {
        data:customers,
        message:"successfully get data",
        status:"success"
      }
    } catch (error) {
      console.log(error);
      return {
        data:error,
        message:"error while get data ",
        status:"error"
      }
    }
  }
  @Query(() => CustomerResponse)
  async customer() {
    try {
      const customers = await getRepository(Customer).find({where:{deleted_at:IsNull() }, relations: ["address", "address.country", "address.city", "address.state","address.contacts"] })
      return {
        data:customers,
        message:"successfully load data",
        status:"success"
      }
    } catch (error) {
      console.log(error);
      return {
        data:error,
        message:"error while load data",
        status:"error"
      }
    }
  }
  @Mutation(() => CustomerResponse)
  async addCustomer(@Arg("data") data: CustomerInput) {
    const customerRepository = getRepository(Customer)
    let inputObject = new Customer();
    inputObject = Object.assign(inputObject, data);
    const errors = await validate(inputObject);
    if (errors.length > 0) {
      console.log("error on customerresolver addcustomer", errors);
      throw new Error(errors.map(e => {
        return (Object.values(e.constraints))
      }).join(", "));
    }
    try {
      let object = await customerRepository.save(inputObject);
      console.log(object);
      return {
        data:object,
        message:"successfully add data",
        status:"success"
      }
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        data: error,
        message: "error while save"
      };
    }
  }

  @Mutation(() => CustomerResponse)
  async updateCustomer(@Arg("data") data: CustomerInput) {
    const customerRepository = getRepository(Customer)
    let inputObject = new Customer();
    inputObject = Object.assign(inputObject, data);
    const errors = await validate(data);
    if (errors.length > 0) {
      console.log("error on customerresolver addcustomer", errors);
      throw new Error(errors.map(e => {
        console.log(Object.values(e.constraints));

        return (Object.values(e.constraints))
      }).join(", "));
    }
    try {
      let object = await customerRepository.save(inputObject);
      console.log(object);
      return {
        data:object,
        message:"successfully update data",
        status:"success"
      }
    } catch (error) {
      console.log(error);
      return {
        data:error,
        message:"error while get data ",
        status:"error"
      }
    }
  }

  @Mutation(() =>CustomerResponse)
  async removeCustomer(@Arg("id", () => Int) id: any) {
    const CustomerRepository = getRepository(Customer);
    const errors = await validate(id);
    if (errors.length > 0) {
      throw new Error(errors.map(e => {
        return (Object.values(e.constraints))
      }).join(", "));
    }
    try {
      // const ifCustomer =  getRepository(Customer).find({where:{id:id},relations:["address"]})
      // if ((await ifCustomer).length) {
      //     console.log("lenght of customer in address " , (await ifCustomer).length);
      //     return {
      //         status: "error",
      //         message: `confict You cant remove if customer id use in another data total found -:}`
      //     }
      // }

      // let object = await CustomerRepository.createQueryBuilder()
      //     .where({ id: id })
      //     .softDelete()
      var object = await CustomerRepository.softDelete(id);
      return {
        data:object,
        message:"successfully deleted data",
        status:"success"
      }
    } catch (error) {
      return {
        status: "error",
        data: error,
        message: "error while save"
      };
    }
  }

}