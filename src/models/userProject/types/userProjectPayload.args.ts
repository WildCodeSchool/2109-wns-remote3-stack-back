import { ArgsType, Field } from 'type-graphql';

type ProjectRole = 'PROJECT_MANAGER' | 'DEVELOPPER' | 'UX_DESIGNER' | 'DEVOPS';

@ArgsType()
export default abstract class IUserProjectPayload {
  @Field(() => String, { nullable: true })
    userId?: string;

  @Field(() => String, { nullable: true })
    projectId?: string;

  @Field(() => String, { nullable: true })
    projectRole?: ProjectRole;
}
