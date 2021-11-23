import { Comment, Status } from '@prisma/client';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class ITask {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  projectId: string;

  @Field(() => String)
  startDate: Date;

  @Field(() => String)
  endDate: Date;

  @Field(() => String)
  estimeeSpentTime: number;

  @Field(() => String)
  advancement: Status;
}
