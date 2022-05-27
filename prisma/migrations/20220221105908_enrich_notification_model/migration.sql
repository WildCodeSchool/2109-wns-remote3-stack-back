/*
  Warnings:

  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `viewed` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `actionType` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editorId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editorName` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedObjectId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedObjectName` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ADDED', 'EDITED', 'DELETED');

-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('COMMENT', 'TASK', 'PROJECT');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "message",
DROP COLUMN "userId",
DROP COLUMN "viewed",
ADD COLUMN     "actionType" "NotificationType" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editorId" TEXT NOT NULL,
ADD COLUMN     "editorName" TEXT NOT NULL,
ADD COLUMN     "modifiedObjectId" TEXT NOT NULL,
ADD COLUMN     "modifiedObjectName" TEXT NOT NULL,
ADD COLUMN     "onId" TEXT,
ADD COLUMN     "onName" TEXT,
ADD COLUMN     "type" "ObjectType" NOT NULL,
ADD COLUMN     "viewedBy" TEXT[];

-- CreateTable
CREATE TABLE "_NotificationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationToUser_AB_unique" ON "_NotificationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationToUser_B_index" ON "_NotificationToUser"("B");

-- AddForeignKey
ALTER TABLE "_NotificationToUser" ADD FOREIGN KEY ("A") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
