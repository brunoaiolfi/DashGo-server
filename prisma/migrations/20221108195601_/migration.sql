-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemPurchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qntd" INTEGER NOT NULL,
    "dtCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER,
    "purchasesId" INTEGER NOT NULL,
    CONSTRAINT "ItemPurchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ItemPurchase_purchasesId_fkey" FOREIGN KEY ("purchasesId") REFERENCES "Purchases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemPurchase" ("dtCreated", "id", "productId", "purchasesId", "qntd", "userId") SELECT "dtCreated", "id", "productId", "purchasesId", "qntd", "userId" FROM "ItemPurchase";
DROP TABLE "ItemPurchase";
ALTER TABLE "new_ItemPurchase" RENAME TO "ItemPurchase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
