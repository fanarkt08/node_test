/*
  Warnings:

  - The values [exotic_wood,noble_and_hardwoods] on the enum `Wood_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [medium_hard] on the enum `Wood_hardness` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `wood` MODIFY `type` ENUM('softwood', 'exotic wood', 'noble and hardwoods') NOT NULL,
    MODIFY `hardness` ENUM('tender', 'medium hard', 'hard') NOT NULL;
