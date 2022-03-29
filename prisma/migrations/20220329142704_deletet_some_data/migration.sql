/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `reservation_id` on the `Reviews` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rooms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "home_type" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "total_occupancy" INTEGER NOT NULL,
    "total_bedrooms" INTEGER NOT NULL,
    "total_bathrooms" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "has_tv" INTEGER NOT NULL,
    "has_kitchen" INTEGER NOT NULL,
    "has_air_con" INTEGER NOT NULL,
    "has_heating" INTEGER NOT NULL,
    "has_Internet" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "published_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rooms" ("address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId") SELECT "address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
CREATE TABLE "new_Reservations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservations" ("created_at", "end_date", "id", "price", "roomId", "start_date", "total", "updated_at", "userId") SELECT "created_at", "end_date", "id", "price", "roomId", "start_date", "total", "updated_at", "userId" FROM "Reservations";
DROP TABLE "Reservations";
ALTER TABLE "new_Reservations" RENAME TO "Reservations";
CREATE TABLE "new_Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("comment", "id", "rating", "roomId", "userId") SELECT "comment", "id", "rating", "roomId", "userId" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
