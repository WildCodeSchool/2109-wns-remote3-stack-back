import { Comment, Status } from '@prisma/client';
import { FloatValueNode } from 'graphql';
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class ITask {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  projectId?: string;

  @Field(() => String)
  startDate: Date;

  @Field(() => String)
  endDate: Date;

  @Field(() => Float)
  estimeeSpentTime: number;

  @Field(() => String)
  advancement: Status;
}
