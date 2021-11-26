import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default abstract class ITagPayload {
@Field(() => String)
  label: string;

@Field(() => String)
  color: string;
}
