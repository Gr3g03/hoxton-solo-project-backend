/*
  Warnings:

  - Added the required column `photo` to the `Rooms` table without a default value. This is not possible if the table is not empty.

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
    "photo" TEXT NOT NULL,
    "published_at" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rooms" ("address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId") SELECT "address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
