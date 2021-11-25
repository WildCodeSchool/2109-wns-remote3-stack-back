import {
  ArgsType,
  Field,
  Float,
} from 'type-graphql';
import 'reflect-metadata';
import { Status } from '@prisma/client';

@ArgsType()
export default abstract class IProjectPayload {
  @Field(() => String)
    status: Status;

  @Field(() => String)
    startDate: Date;

  @Field(() => String)
    endDate: Date;

  @Field(() => Float)
    estimeeSpentTime: number;
}
