import { Status } from '@prisma/client';
import {
  Field, Float, ID, ObjectType,
} from 'type-graphql';
import IComment from '../../comment/types/comment.types';
import ITag from '../../tag/types/tag.type';
import IUser from '../../user/types/user.type';

@ObjectType()
export default abstract class ITask {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    subject: string;

  @Field(() => String)
    projectId?: string;

  @Field(() => [IUser])
    users: IUser[];

  @Field(() => String)
    startDate: Date;

  @Field(() => String)
    endDate: Date;

  @Field(() => Float)
    estimeeSpentTime: number;

  @Field(() => String)
    advancement: Status;

  @Field(() => [IComment])
    comments: IComment[];

  @Field(() => [ITag])
    tags: ITag[];
}
