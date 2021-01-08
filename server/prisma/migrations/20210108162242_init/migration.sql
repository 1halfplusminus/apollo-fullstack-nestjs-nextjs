/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[launchId]` on the table `Trip`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[userId,launchId]` on the table `Trip`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trip.launchId_unique" ON "Trip"("launchId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_trip" ON "Trip"("userId", "launchId");
