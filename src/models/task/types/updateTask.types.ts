import { Status } from '@prisma/client';
import { ArgsType, Field, Float, ID } from 'type-graphql';

@ArgsType()
export default abstract class ITaskPayload {
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
  advancement: Status;

  @Field(() => Float)
  estimeeSpentTime: number;
}
