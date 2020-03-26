import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Contacts } from "../../entity/Contacts";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Address } from "../../entity/Address";
import { ContactInput } from "../inputs/contact.inputs";


@Resolver()
export class ContactResolver {
    @Query(() => [Contacts])
    async customerWithId(@Arg("id", () => Int) id: any) {
        try {
            const contact = await getRepository(Contacts).find()
            return contact;
        } catch (error) {
            console.log(error);
        }
    }

    @Mutation(() => Contacts)
    async Addcontact(@Arg("data") data: ContactInput) {
        try {
            const contactrepo = getRepository(Contacts)
            let inputObject = new Contacts();
            inputObject = Object.assign(inputObject, data);
            const errors = await validate(inputObject);
            if (errors.length > 0) {
                console.log("error on Contactsresolver addContacts", errors);
                throw new Error(errors.map(e => {
                    return (Object.values(e.constraints))
                }).join(", "));
            }
            let object = await contactrepo.save(inputObject);
            console.log(object);
            return object;
        } catch (error) {
            console.log(error);
        }
    }

    @Mutation(() => Contacts)
    async Updatecontact(@Arg("data") data: ContactInput) {
        try {
            const contactrepo = getRepository(Contacts)
            let inputObject = new Contacts();
            inputObject = Object.assign(inputObject, data);
            const errors = await validate(inputObject);
            if (errors.length > 0) {
                console.log("error on Contactsresolver updateContacts", errors);
                throw new Error(errors.map(e => {
                    return (Object.values(e.constraints))
                }).join(", "));
            }
            let object = await contactrepo.save(inputObject);
            console.log(object);
            return object;
        } catch (error) {
            console.log(error);
        }
    }

    @Mutation(() => Contacts)
    async removeContact(@Arg("id", () => Int) id: any) {
        const ContactRepository = getRepository(Contacts);
        const errors = await validate(id);
        if (errors.length > 0) {
            throw new Error(errors.map(e => {
                return (Object.values(e.constraints))
            }).join(", "));
        }
        try {
            const ifcontact = getRepository(Address).find({ where: { id: id } })
            if ((await ifcontact).length) {
                console.log("lenght of contact in address ", (await ifcontact).length);

                return {
                    status: "error",
                    message: `confict You cant remove if contact id use in another data total found -:}`
                }
            }
            var object = await ContactRepository.softDelete(id);
            // let object = await ContactRepository.createQueryBuilder('contact')
            // .where('contact.id = contactId' ,{contactId:id})
            //     .softDelete()
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
