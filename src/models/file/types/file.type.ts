import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class IFile {
  @Field(() => String)
    filename: string;

  @Field(() => String)
    mimetype: string;

  @Field(() => String)
    encoding: string;
}
