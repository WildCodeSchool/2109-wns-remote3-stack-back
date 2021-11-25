import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import INotification from './types/notification.types';
import NotificationService from './notification.service';
import IPayloadNotification from './types/payloadNotification.types';

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

  //* Create one notification
  @Mutation(() => INotification)
  async createNotification(@Args()payload: IPayloadNotification):Promise<INotification> {
    return NotificationService().createNewNotification(payload);
  }

  //* Update one notification
  @Mutation(() => INotification)
  async updateNotification(@Args()payload: IPayloadNotification, @Arg('id') id: string):Promise<INotification> {
    return NotificationService().updateNotificationById(payload, id);
  }

  //* Delete a notification
  @Mutation(() => INotification)
  async deleteNotificationById(@Arg('id') id: string): Promise<INotification> {
    return NotificationService().deleteById(id);
  }
}
