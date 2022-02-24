import { ICreateNotificationType } from '@notification/types/createNotification.type';
import {
  Notification,
  Prisma,
  User,
  UserProject,
} from '@prisma/client';
import { prisma } from '@utils/prisma';

interface NotificationWithSubscribers extends Notification {
  subscribers: User[];
}

export default function NotificationPrismaDto() {
  //* Get all notifications
  async function getAllNotifications(): Promise<Notification[]> {
    return prisma.notification.findMany();
  }

  async function userNotifications(
    userId: string,
  ): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: {
        subscribers: {
          some: {
            id: userId,
          },
        },
      },
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
    users: UserProject[],
  ): Promise<NotificationWithSubscribers> {
    return prisma.notification.create({
      data: {
        ...data,
        subscribers: {
          connect: users.map((user) => ({
            id: user.userId,
          })),
        },
        viewedBy: [],
      },
      include: {
        subscribers: true,
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
    userNotifications,
    getOneNotificationById,
    createNotification,
    updateNotification,
    deleteOneNotificationById,
  };
}
