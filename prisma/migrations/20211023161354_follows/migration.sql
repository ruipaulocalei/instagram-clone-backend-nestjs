-- CreateTable
CREATE TABLE "_FollowRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRelation_AB_unique" ON "_FollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRelation_B_index" ON "_FollowRelation"("B");

-- RedefineIndex
DROP INDEX "User.email_unique";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- RedefineIndex
DROP INDEX "User.username_unique";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
