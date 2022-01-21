import { ArgsType, Field } from 'type-graphql';

type ProjectRole = 'PROJECT_MANAGER' | 'DEVELOPPER' | 'UX_DESIGNER' | 'DEVOPS';

@ArgsType()
export default abstract class IUserProjectPayload {
  @Field(() => String)
    userId: string;

  @Field(() => String)
    projectId: string;

  @Field(() => String)
    projectRole: ProjectRole;
}
