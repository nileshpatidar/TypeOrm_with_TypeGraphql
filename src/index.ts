import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server";
import {CustomerResolver} from "./graphql/resolver/CustomerResolver"
import {AddressResolver} from "./graphql/resolver/AddressResolver"
import {CityResolver} from "./graphql/resolver/CityResolver"
import {CountryResolver} from "./graphql/resolver/CountryResolver"
import {StateResolver} from "./graphql/resolver/StateResolver"
// import {CustomerResolver} from "./graphql/resolver//"
import { buildSchema } from "type-graphql";
import { ContactResolver } from "./graphql/resolver/ContactResolver";
async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers:[CustomerResolver,AddressResolver,ContactResolver ,CountryResolver,CityResolver,StateResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}

main()