/*
  Warnings:

  - Added the required column `verified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'customer',
    ADD COLUMN `verified` BOOLEAN NOT NULL;
