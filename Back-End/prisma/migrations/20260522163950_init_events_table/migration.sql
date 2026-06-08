/*
  Warnings:

  - You are about to drop the column `title` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pembicara` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `pembicara` table. All the data in the column will be lost.
  - You are about to drop the `category_events` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `pembicara` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_category_id_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pembicara" DROP COLUMN "created_at",
DROP COLUMN "image",
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "category_events";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
