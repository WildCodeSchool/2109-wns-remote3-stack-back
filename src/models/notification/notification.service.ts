import NotificationPrismaDto from '@notification/dto/notificationDto.prisma';
import INotification from '@notification/types/notification.type';
import INotificationPayload from '@notification/types/payloadNotification.args';

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

  //* Create a notification
  async function createNewNotification(payload: INotificationPayload): Promise<INotification> {
    const notification = await NotificationPrismaDto().createNotification(payload);
    if (!notification) {
      throw new Error('Notification not created');
    }
    return notification;
  }
  //* Update a notification
  async function updateNotificationById(
    payload: INotificationPayload,
    id: string,
  ): Promise<INotification> {
    const notification = await NotificationPrismaDto().updateNotification(payload, { id });
    if (!notification) {
      throw new Error('notification not updated');
    }
    return notification;
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
    deleteById,
    createNewNotification,
    updateNotificationById,
  };
}
