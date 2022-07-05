/*
  Warnings:

  - You are about to drop the `projectMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "projectMembers" DROP CONSTRAINT "projectMembers_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectMembers" DROP CONSTRAINT "projectMembers_userId_fkey";

-- DropTable
DROP TABLE "projectMembers";
