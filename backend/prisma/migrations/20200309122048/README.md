# Migration `20200309122048`

This migration has been generated at 3/9/2020, 12:20:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OTHER');

CREATE TABLE "public"."App" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "id" text  NOT NULL ,
    "isActive" boolean  NOT NULL DEFAULT true,
    "name" text   ,
    "token" text   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "app" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "email" text  NOT NULL DEFAULT '',
    "id" text  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "password" text  NOT NULL DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Amenity" (
    "app" text  NOT NULL ,
    "author" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "description" text   ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Room" (
    "app" text  NOT NULL ,
    "author" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "description" text   ,
    "id" text  NOT NULL ,
    "isBooked" boolean  NOT NULL DEFAULT false,
    "location" text   ,
    "name" text  NOT NULL DEFAULT '',
    "price" Decimal(65,30)  NOT NULL DEFAULT 0,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Package" (
    "app" text   ,
    "author" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "description" text   ,
    "id" text  NOT NULL ,
    "image_url" text  NOT NULL DEFAULT '',
    "name" text  NOT NULL DEFAULT '',
    "price" Decimal(65,30)  NOT NULL DEFAULT 0,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Book" (
    "app" text  NOT NULL ,
    "arrivalTime" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "author" text  NOT NULL ,
    "clientEmail" text   ,
    "clientName" text  NOT NULL DEFAULT '',
    "clientPhone" text  NOT NULL DEFAULT '',
    "cost" Decimal(65,30)  NOT NULL DEFAULT 0,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "deletedAt" timestamp(3)   ,
    "depatureTime" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "isApproved" boolean  NOT NULL DEFAULT false,
    "room" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_AmenityToRoom" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_BookToPackage" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "_AmenityToRoom_AB_unique" ON "public"."_AmenityToRoom"("A","B")

CREATE UNIQUE INDEX "_BookToPackage_AB_unique" ON "public"."_BookToPackage"("A","B")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("app")REFERENCES "public"."App"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Amenity" ADD FOREIGN KEY ("app")REFERENCES "public"."App"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Amenity" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Room" ADD FOREIGN KEY ("app")REFERENCES "public"."App"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Room" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Package" ADD FOREIGN KEY ("app")REFERENCES "public"."App"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Package" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Book" ADD FOREIGN KEY ("app")REFERENCES "public"."App"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Book" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Book" ADD FOREIGN KEY ("room")REFERENCES "public"."Room"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."_AmenityToRoom" ADD FOREIGN KEY ("A")REFERENCES "public"."Amenity"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_AmenityToRoom" ADD FOREIGN KEY ("B")REFERENCES "public"."Room"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_BookToPackage" ADD FOREIGN KEY ("A")REFERENCES "public"."Book"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_BookToPackage" ADD FOREIGN KEY ("B")REFERENCES "public"."Package"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200309122048
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,113 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgres"
+  url      = env("DATABASE_URL")
+}
+
+generator client { 
+  provider = "prisma-client-js"
+}
+
+model App {
+  id String @id @default(cuid())
+  name String?
+  token String?
+  isActive Boolean @default(true)
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+  users User[]
+  rooms Room[]
+  amenities Amenity[]
+  packages Package[]
+  books Book[]
+}
+
+// model Role {
+//   id String @id @default(cuid())
+//   name String
+//   description String?
+//   users User[]
+//   createdAt DateTime @default(now())
+//   updatedAt DateTime @default(now())
+//   deletedAt DateTime?
+// }
+
+model User {
+  id String @id @default(cuid())
+  name String 
+  email String @unique
+  password String 
+  app App 
+  role Role
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+  books Book[]
+  rooms Room[]
+}
+
+model Amenity {
+  id String @id @default(cuid())
+  name String 
+  description String?
+  app App
+  author User
+  rooms Room[]
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+}
+
+model Room {
+  id String @id @default(cuid())
+  name String 
+  description String?
+  location String?
+  amenities Amenity[]
+  isBooked Boolean @default(false)
+  app App
+  author User
+  price Float
+  books Book[]
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+}
+
+model Package {
+  id String @id @default(cuid())
+  name String
+  description String?
+  image_url String
+  price Float
+  books Book[]
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+  author User
+}
+model Book {
+  id String @id @default(cuid())
+  clientName String
+  clientEmail String?
+  clientPhone String
+  room Room
+  arrivalTime DateTime
+  depatureTime DateTime
+  app App
+  author User
+  cost Float
+  isApproved Boolean @default(false)
+  packages Package[]
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  deletedAt DateTime? 
+}
+
+enum Role {
+  ADMIN
+  OTHER
+}
```


