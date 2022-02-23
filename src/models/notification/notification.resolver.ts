import {
  Resolver, Query, Arg, Ctx, Mutation,
} from 'type-graphql';
import INotification from '@notification/types/notification.type';
import NotificationService from '@notification/notification.service';
import { IContext } from '@utils/context/interface/context.interface';

@Resolver(() => INotification)
export default class NotificationResolver {
  //* Get all Notifications
  @Query(() => [INotification])
  async getAllNotifications(): Promise<INotification[]> {
    return NotificationService().allNotifications();
  }

  //* Get one notification by id
  @Query(() => INotification)
  async getNotificationByID(
    @Arg('id') id: string,
  ): Promise<INotification> {
    return NotificationService().findNotificationById(id);
  }

  @Query(() => [INotification])
  async getUserNotifications(
    @Ctx() context: IContext,
  ): Promise<INotification[]> {
    return NotificationService().findNotificationsByUserId(context);
  }

  @Mutation(() => INotification)
  async updateNotificationStatus(
    @Arg('id') id: string,
    @Ctx() context: IContext,
  ): Promise<INotification> {
    return NotificationService().updateNotificationStatus(id, context);
  }
}
