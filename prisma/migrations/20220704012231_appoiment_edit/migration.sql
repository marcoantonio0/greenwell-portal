/*
  Warnings:

  - Added the required column `type` to the `appointmentTime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "appointmentTimeType" AS ENUM ('ENTRY', 'OUT');

-- AlterTable
ALTER TABLE "appointmentTime" ADD COLUMN     "type" "appointmentTimeType" NOT NULL;
