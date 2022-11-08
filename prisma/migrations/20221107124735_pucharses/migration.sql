/*
  Warnings:

  - You are about to drop the column `discount` on the `Purchases` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Purchases_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchases" ("clientId", "createdAt", "id", "value") SELECT "clientId", "createdAt", "id", "value" FROM "Purchases";
DROP TABLE "Purchases";
ALTER TABLE "new_Purchases" RENAME TO "Purchases";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
