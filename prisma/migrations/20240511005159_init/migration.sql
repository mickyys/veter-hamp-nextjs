-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super', 'owner', 'admin', 'user', 'doctor', 'hairdresser');

-- CreateEnum
CREATE TYPE "VeterinaryType" AS ENUM ('main', 'branch');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('monday', 'tuestday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('free', 'basic', 'premium');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Veterinary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subscription" "Subscription" NOT NULL
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "type" "VeterinaryType" NOT NULL DEFAULT 'main'
);

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "name" "Days" NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VeterinaryAccount" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "VeterinaryAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "docNumber" TEXT,
    "birthDate" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "lastName" TEXT,
    "address" TEXT,
    "city" TEXT,
    "countryId" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "vip" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "record" INTEGER,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "species" TEXT,
    "race" TEXT,
    "gender" "Gender",
    "microship" INTEGER,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportMedical" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reasons" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "syptomsDate" TIMESTAMP(3) NOT NULL,
    "physicalExam" TEXT NOT NULL,
    "firstTime" BOOLEAN NOT NULL DEFAULT true,
    "heartRate" TEXT NOT NULL,
    "breathingFrecuency" TEXT NOT NULL,
    "bloodPresure" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "mucousMembranes" TEXT NOT NULL,
    "presumptiveDiagnosis" TEXT NOT NULL,
    "differentialDiagnosis" TEXT NOT NULL,
    "laboratoryTest" TEXT NOT NULL,
    "defintiveDiagnosis" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "recipe" TEXT NOT NULL,

    CONSTRAINT "reportMedical_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Veterinary_id_key" ON "Veterinary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_key" ON "Branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Day_name_key" ON "Day"("name");

-- CreateIndex
CREATE INDEX "VeterinaryAccount_veterinaryId_accountId_idx" ON "VeterinaryAccount"("veterinaryId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE INDEX "Tutor_veterinaryId_idx" ON "Tutor"("veterinaryId");

-- CreateIndex
CREATE INDEX "Tutor_veterinaryId_name_idx" ON "Tutor"("veterinaryId", "name");

-- CreateIndex
CREATE INDEX "Tutor_veterinaryId_docNumber_idx" ON "Tutor"("veterinaryId", "docNumber");

-- CreateIndex
CREATE INDEX "Patient_veterinaryId_idx" ON "Patient"("veterinaryId");

-- CreateIndex
CREATE INDEX "Patient_veterinaryId_tutorId_idx" ON "Patient"("veterinaryId", "tutorId");

-- CreateIndex
CREATE INDEX "Patient_veterinaryId_name_idx" ON "Patient"("veterinaryId", "name");

-- CreateIndex
CREATE INDEX "reportMedical_veterinaryId_idx" ON "reportMedical"("veterinaryId");

-- CreateIndex
CREATE INDEX "reportMedical_veterinaryId_patientId_idx" ON "reportMedical"("veterinaryId", "patientId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "Veterinary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeterinaryAccount" ADD CONSTRAINT "VeterinaryAccount_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "Veterinary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeterinaryAccount" ADD CONSTRAINT "VeterinaryAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "Veterinary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "Veterinary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportMedical" ADD CONSTRAINT "reportMedical_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "Veterinary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportMedical" ADD CONSTRAINT "reportMedical_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportMedical" ADD CONSTRAINT "reportMedical_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
