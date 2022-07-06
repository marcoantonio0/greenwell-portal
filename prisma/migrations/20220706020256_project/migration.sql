/*
  Warnings:

  - You are about to drop the column `index` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "index",
ADD COLUMN     "pos" INTEGER DEFAULT 0;
