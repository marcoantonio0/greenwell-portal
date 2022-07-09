-- AlterTable
ALTER TABLE "PreUser" ADD COLUMN     "teamId" INTEGER;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "PreUser" ADD CONSTRAINT "PreUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
