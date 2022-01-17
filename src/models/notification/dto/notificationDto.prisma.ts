import {
  Notification,
  Prisma,
} from '@prisma/client';
import { prisma } from '@utils/prisma';
import IPayloadNotification from '@notification/types/payloadNotification.type';

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
  async function createNotification(payload: IPayloadNotification): Promise<Notification> {
    return prisma.notification.create({
      data: {
        ...payload,
      },
    });
  }

  // //*  Update notification by id
  async function updateNotification(
    payload: IPayloadNotification,
    id: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification> {
    return prisma.notification.update({
      where: id,
      data: {
        ...payload,
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
