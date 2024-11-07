/*
  Warnings:

  - You are about to drop the column `Priority` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "Priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM';
