-- CreateTable
CREATE TABLE "UserSession" (
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("sessionId")
);

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;
