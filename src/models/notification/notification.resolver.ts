import {
  Resolver, Query, Arg,
} from 'type-graphql';
import INotification from '@notification/types/notification.type';
import NotificationService from '@notification/notification.service';

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

  // TODO: get user notifications
}
