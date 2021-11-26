import { Status } from '@prisma/client';
import {
  ArgsType, Field, Float,
} from 'type-graphql';

@ArgsType()
export default abstract class ITaskPayload {
  @Field(() => String)
    subject: string;

  @Field(() => String)
    projectId: string;

  @Field(() => String)
    endDate: Date;

  @Field(() => String)
    advancement: Status;

  @Field(() => Float)
    estimeeSpentTime: number;
}
