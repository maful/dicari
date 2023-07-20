/*
  Warnings:

  - You are about to drop the column `user_id` on the `jobs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "jobs_user_id_idx";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "user_id";
