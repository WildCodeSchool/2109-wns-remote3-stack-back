import { ICreateNotificationType } from '@notification/types/createNotification.type';
import {
  Notification,
  Prisma,
  User,
} from '@prisma/client';
import { prisma } from '@utils/prisma';

export default function NotificationPrismaDto() {
  //* Get all notifications
  async function getAllNotifications(): Promise<Notification[]> {
    return prisma.notification.findMany({

    });
  }
  //* Get one notification by Id
  async function getOneNotificationById(
    id: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification | null> {
    return prisma.notification.findUnique({
      where: id,
    });
  }
  //*  Create a notification
  async function createNotification(
    data: ICreateNotificationType,
    users: Omit<User, 'avatar'>[],
  ): Promise<Notification> {
    return prisma.notification.create({
      data: {
        ...data,
        subscribers: {
          connect: users.map((user) => ({
            id: user.id,
          })),
        },
        viewedBy: [],
      },
    });
  }

  //*  Update notification by id
  async function updateNotification(
    payload: Notification,
    id: Prisma.NotificationWhereUniqueInput,
    viewedBy: string[],
  ): Promise<Notification> {
    return prisma.notification.update({
      where: id,
      data: {
        ...payload,
        viewedBy,
      },
    });
  }
  //*  Delete notification by id
  async function deleteOneNotificationById(
    id: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification| null> {
    return prisma.notification.delete({
      where: id,
    });
  }

  return {
    getAllNotifications,
    getOneNotificationById,
    createNotification,
    updateNotification,
    deleteOneNotificationById,
  };
}
