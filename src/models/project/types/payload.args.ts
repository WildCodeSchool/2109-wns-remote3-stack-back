import {
  ArgsType,
  Field,
  Float,
} from 'type-graphql';
import { IStatus } from './status.enum';

@ArgsType()
export default abstract class IProjectPayload {
  @Field(() => String, { nullable: true })
    name?: string;

  @Field(() => String, { nullable: true })
    description?: string;

  @Field(() => String, { nullable: true })
    status?: IStatus;

  @Field(() => Date, { nullable: true })
    startDate?: Date;

  @Field(() => Date, { nullable: true })
    endDate?: Date;

  @Field(() => Float, { nullable: true })
    estimeeSpentTime?: number;
}
