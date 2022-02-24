import NotificationPrismaDto from '@notification/dto/notificationDto.prisma';
import INotification from '@notification/types/notification.type';
import { ICreateNotificationType } from '@notification/types/createNotification.type';
import UserProjectService from '@userProject/userProject.service';
import IUserProject from '@userProject/types/userProject.type';
import { IContext } from '@utils/context/interface/context.interface';
import IUser from '@user/types/user.type';

export default function NotificationService() {
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

  async function findNotificationsByUserId(context: IContext): Promise<INotification[]> {
    const notifications = await NotificationPrismaDto().userNotifications(context.userId || '');
    if (!notifications) {
      throw new Error('No notification found');
    }
    return notifications;
  }

  //* Create a notification
  async function createNewNotification(
    notificationData: ICreateNotificationType,
    projectId: string,
  ): Promise<INotification & { subscribers: IUser[] }> {
    const subscribers: IUserProject[] = await UserProjectService().findUsersByProjectId(projectId);
    const notification = await NotificationPrismaDto()
      .createNotification(notificationData, subscribers);
    if (!notification) {
      throw new Error('Notification not created');
    }
    return notification;
  }

  async function updateNotificationStatus(
    notificationId: string,
    context: IContext,
  ): Promise<INotification> {
    const notification = await NotificationPrismaDto()
      .getOneNotificationById({ id: notificationId });
    if (!notification) {
      throw new Error('Notification not created');
    }
    const viewedBy = [...notification.viewedBy, context.userId || ''];
    const updatedNotification = await NotificationPrismaDto()
      .updateNotification(notification, { id: notificationId }, viewedBy);
    return updatedNotification;
  }

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
    findNotificationsByUserId,
    createNewNotification,
    updateNotificationStatus,
    deleteById,
  };
}
