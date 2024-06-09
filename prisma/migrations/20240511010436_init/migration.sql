/*
  Warnings:

  - The values [tuestday] on the enum `Days` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Days_new" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
ALTER TABLE "Day" ALTER COLUMN "name" TYPE "Days_new" USING ("name"::text::"Days_new");
ALTER TYPE "Days" RENAME TO "Days_old";
ALTER TYPE "Days_new" RENAME TO "Days";
DROP TYPE "Days_old";
COMMIT;
