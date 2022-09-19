-- CreateTable
CREATE TABLE "_followRel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followRel_AB_unique" ON "_followRel"("A", "B");

-- CreateIndex
CREATE INDEX "_followRel_B_index" ON "_followRel"("B");

-- AddForeignKey
ALTER TABLE "_followRel" ADD CONSTRAINT "_followRel_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRel" ADD CONSTRAINT "_followRel_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
