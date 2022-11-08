/*
  Warnings:

  - You are about to drop the column `productId` on the `Purchases` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qntd" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER,
    "purchasesId" INTEGER,
    CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Stock_purchasesId_fkey" FOREIGN KEY ("purchasesId") REFERENCES "Purchases" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("id", "productId", "qntd", "userId") SELECT "id", "productId", "qntd", "userId" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
CREATE TABLE "new_Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchases_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchases" ("clientId", "createdAt", "id", "value") SELECT "clientId", "createdAt", "id", "value" FROM "Purchases";
DROP TABLE "Purchases";
ALTER TABLE "new_Purchases" RENAME TO "Purchases";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
