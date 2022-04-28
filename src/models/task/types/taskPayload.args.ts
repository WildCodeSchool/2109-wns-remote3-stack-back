import { IStatus } from '@project/types/status.enum';
import {
  ArgsType,
  Field, Float,
} from 'type-graphql';

@ArgsType()
export default abstract class ITaskPayload {
  @Field(() => String, { nullable: true })
    name?: string;

  @Field(() => String, { nullable: true })
    description?: string;

  @Field(() => String, { nullable: true })
    projectId?: string;

  @Field(() => String, { nullable: true })
    endDate?: Date;

  @Field(() => [String], { nullable: true })
    userIds?: string[];

  @Field(() => String, { nullable: true })
    advancement?: IStatus;

  @Field(() => Float, { nullable: true })
    estimeeSpentTime?: number;
}
