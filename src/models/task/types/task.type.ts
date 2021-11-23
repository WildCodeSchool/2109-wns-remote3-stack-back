import { Status } from '@prisma/client';
import IComment from '../../../models/comment/types/comment.types';
import ITag from '../../../models/tag/types/tag.type';
import IUser from '../../../models/user/types/user.type';
import { Field, Float, ID, ObjectType } from 'type-graphql';

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
