import {
  Field, Float, ID, ObjectType,
} from 'type-graphql';
import ITag from '@tag/types/tag.type';
import IUser from '@user/types/user.type';
import IComment from '@comment/types/comment.type';
import { IStatus } from '@project/types/status.enum';

@ObjectType()
export default abstract class ITask {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    name: string;

  @Field(() => String)
    description: string;

  @Field(() => String)
    projectId: string;

  @Field(() => [IUser])
    users: IUser[];

  @Field(() => String)
    startDate: Date;

  @Field(() => String)
    endDate: Date;

  @Field(() => Float)
    estimeeSpentTime: number;

  @Field(() => String)
    advancement: IStatus;

  @Field(() => [IComment])
    comments: IComment[];

  @Field(() => [ITag])
    tags: ITag[];
}
