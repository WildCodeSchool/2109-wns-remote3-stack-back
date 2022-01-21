import {
  ArgsType,
  Field,
  Float,
} from 'type-graphql';
import { IStatus } from './status.enum';

@ArgsType()
export default abstract class IProjectPayload {
  @Field(() => String)
    name: string;

  @Field(() => String)
    description: string;

  @Field(() => String)
    status: IStatus;

  @Field(() => Date)
    startDate: Date;

  @Field(() => Date)
    endDate: Date;

  @Field(() => Float)
    estimeeSpentTime: number;
}
