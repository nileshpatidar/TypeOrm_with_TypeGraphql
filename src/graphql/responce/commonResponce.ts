import {Field, ObjectType, ClassType} from "type-graphql";

export default function CommonResponse<TItem>(TItemClass: [ClassType<TItem>]) {
    // `isAbstract` decorator option is mandatory to prevent registering in schema
    @ObjectType({isAbstract: true})
    abstract class CommonResponseClass {

        @Field({nullable: true})
        status?: string;

        @Field(type => TItemClass, {nullable: true})
        data?: TItem;

        @Field({nullable: true})
        message?: string;
    }

    return CommonResponseClass;
}
