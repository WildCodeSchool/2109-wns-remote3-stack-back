import { Field, ID, ObjectType } from 'type-graphql';
import IUser from '../../user/types/user.type';
import IProject from '../../project/types/project.type';

@ObjectType()
export default class IUserProject {
  @Field()
    user: IUser[];

  @Field(() => ID)
    userId: string;

  @Field()
    project: IProject[];

  @Field(() => ID)
    projectId: string;

  @Field()
    projetRole: any;
}
