import { ObjectType, Field, ID } from 'type-graphql';

type INotificationType = 'ADDED' | 'EDITED' | 'DELETED';
type IObjectType = 'COMMENT' | 'TASK' | 'PROJECT';

@ObjectType()
export default abstract class INotification {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    editorName: string;

  @Field(() => ID)
    editorId: string;

  // ? Not sure about this type here, we'll have to check if it works correctly
  @Field(() => String)
    actionType: INotificationType;

  @Field(() => String)
    modifiedObjectName: string;

  @Field(() => String)
    modifiedObjectId: string;

  @Field(() => String, { nullable: true })
    onName?: string | null;

  @Field(() => String, { nullable: true })
    onId?: string | null;

  @Field(() => String)
    type: IObjectType;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => [String])
    viewedBy: string[];
}
