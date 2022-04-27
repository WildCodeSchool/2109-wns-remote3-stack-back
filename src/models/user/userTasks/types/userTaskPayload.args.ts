import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default abstract class IUserProjectPayload {
  @Field(() => String)
    userId: string;

  @Field(() => String)
    taskId: string;
}
