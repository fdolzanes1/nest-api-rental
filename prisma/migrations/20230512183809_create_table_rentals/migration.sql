-- CreateTable
CREATE TABLE "rentals" (
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("carId","userId")
);

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
