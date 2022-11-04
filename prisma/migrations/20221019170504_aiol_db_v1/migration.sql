-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "avatarUrl" TEXT,
    "dtCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtEdited" DATETIME
);
INSERT INTO "new_Enterprise" ("amount", "avatarUrl", "dtCreated", "dtEdited", "email", "id", "name", "password") SELECT "amount", "avatarUrl", "dtCreated", "dtEdited", "email", "id", "name", "password" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
