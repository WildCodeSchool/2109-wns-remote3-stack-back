import { IStatus } from '@project/types/status.enum';
import {
  ArgsType,
  Field, Float,
} from 'type-graphql';

@ArgsType()
export default abstract class ITaskPayload {
  @Field(() => String)
    name: string;

  @Field(() => String)
    description: string;

  @Field(() => String)
    projectId: string;

  @Field(() => String)
    endDate: Date;

  @Field(() => String)
    advancement: IStatus;

  @Field(() => Float)
    estimeeSpentTime: number;
}
