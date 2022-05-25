import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default abstract class IFilePayload {
  @Field(() => GraphQLUpload)
    file: FileUpload;
}
