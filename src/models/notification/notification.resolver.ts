import {
  Resolver, Query, Arg, Ctx, Mutation, Subscription, Root,
} from 'type-graphql';
import INotification from '@notification/types/notification.type';
import NotificationService from '@notification/notification.service';
import { IContext } from '@utils/context/interface/context.interface';
import IUser from '@user/types/user.type';

@Resolver(() => INotification)
export default class NotificationResolver {
  // * Get all notifications
  @Query(() => [INotification])
  async getAllNotifications() {
    return NotificationService().allNotifications();
  }

  //* Notification subscription
  @Subscription(() => INotification, {
    topics: 'NOTIFICATIONS',
  })
  async newNotification(
    @Root() notificationPayload: INotification,
  ): Promise<INotification> {
    return notificationPayload;
  }

  //* Get one notification by id
  @Query(() => INotification)
  async getNotificationByID(
    @Arg('id') id: string,
  ): Promise<INotification> {
    return NotificationService().findNotificationById(id);
  }

  @Subscription(() => INotification, {
    topics: 'USER_NOTIFICATIONS',
    nullable: true,
  })
  // eslint-disable-next-line consistent-return
  async newUserNotification(
    @Root() notificationPayload: INotification & { subscribers: IUser[] },
    @Ctx() context: IContext,
  ): Promise<INotification | undefined> {
    const { subscribers, ...notification } = notificationPayload;
    if (subscribers.map((subscriber) => subscriber.id).includes(context.userId || '')) {
      return notification;
    }
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
