-- CreateTable
CREATE TABLE "cars_specifications" (
    "carId" INTEGER NOT NULL,
    "specificationId" INTEGER NOT NULL,

    CONSTRAINT "cars_specifications_pkey" PRIMARY KEY ("carId","specificationId")
);

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
