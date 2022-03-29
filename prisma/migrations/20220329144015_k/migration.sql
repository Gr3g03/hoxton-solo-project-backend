-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservations" ("created_at", "end_date", "id", "price", "roomId", "start_date", "total", "updated_at", "userId") SELECT "created_at", "end_date", "id", "price", "roomId", "start_date", "total", "updated_at", "userId" FROM "Reservations";
DROP TABLE "Reservations";
ALTER TABLE "new_Reservations" RENAME TO "Reservations";
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
    "published_at" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rooms" ("address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId") SELECT "address", "created_at", "has_Internet", "has_air_con", "has_heating", "has_kitchen", "has_tv", "home_type", "id", "price", "published_at", "room_type", "total_bathrooms", "total_bedrooms", "total_occupancy", "userId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "dateCreated" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);
INSERT INTO "new_User" ("dateCreated", "email", "firstName", "id", "lastName", "password", "phone_number", "photo") SELECT "dateCreated", "email", "firstName", "id", "lastName", "password", "phone_number", "photo" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
