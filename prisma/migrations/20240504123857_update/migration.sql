/*
  Warnings:

  - You are about to alter the column `experience` on the `Doctor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `description` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `description` JSON NOT NULL,
    MODIFY `experience` JSON NOT NULL;
