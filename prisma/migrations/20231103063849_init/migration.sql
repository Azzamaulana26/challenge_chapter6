-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Picture_fileId_key" ON "Picture"("fileId");
