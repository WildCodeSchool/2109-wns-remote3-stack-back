import NotificationPrismaDto from '@notification/dto/notificationDto.prisma';
import INotification from '@notification/types/notification.type';
import { ICreateNotificationType } from '@notification/types/createNotification.type';

export default function TaskService() {
  //* Get all notifications
  async function allNotifications(): Promise<INotification[]> {
    const notification = await NotificationPrismaDto().getAllNotifications();
    if (!notification) {
      throw new Error('No notifications found');
    }
    return notification;
  }
  //* Get one notification by ID
  async function findNotificationById(id: string): Promise<INotification> {
    const notification = await NotificationPrismaDto().getOneNotificationById({ id });
    if (!notification) {
      throw new Error('No notification found');
    }
    return notification;
  }

  // TODO: all the CREATE logic must be handled from the backend ONLY
  // TODO: data must come from other services and be generic so it can be used everywhere

  //* Create a notification
  async function createNewNotification(
    notificationData: ICreateNotificationType,
    projectId: string,
  ): Promise<void> {
    const notification = await NotificationPrismaDto()
      .createNotification(notificationData, projectId);
    if (!notification) {
      throw new Error('Notification not created');
    }
  }
  // //* Update a notification
  // async function updateNotificationById(
  //   payload: INotificationPayload,
  //   id: string,
  // ): Promise<INotification> {
  //   const notification = await NotificationPrismaDto().updateNotification(payload, { id });
  //   if (!notification) {
  //     throw new Error('notification not updated');
  //   }
  //   return notification;
  // }

  //* Delete a notification
  async function deleteById(id: string): Promise<INotification> {
    const notification = await NotificationPrismaDto().deleteOneNotificationById({ id });
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  }

  return {
    allNotifications,
    findNotificationById,
    createNewNotification,
    deleteById,
  };
}
