-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "home_type" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "total_occupancy" INTEGER NOT NULL,
    "total_bedrooms" INTEGER NOT NULL,
    "total_bathrooms" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "has_tv" INTEGER NOT NULL,
    "has_kitchen" INTEGER NOT NULL,
    "has_air_con" INTEGER NOT NULL,
    "has_heating" INTEGER NOT NULL,
    "has_Internet" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "published_at" DATETIME NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservation_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
