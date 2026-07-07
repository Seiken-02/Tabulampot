import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  email: varchar("email", { length: 100 }).notNull().unique(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const plantTypes = pgTable("plant_types", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  waterIntervalDays: integer("water_interval_days").notNull(),

  fertilizerIntervalDays: integer(
    "fertilizer_interval_days"
  ).notNull(),

  recommendedFertilizer: varchar(
    "recommended_fertilizer",
    { length: 100 }
  ),

  description: text("description"),
});

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),

  plantTypeId: integer("plant_type_id")
    .references(() => plantTypes.id)
    .notNull(),

  nickname: varchar("nickname", {
    length: 100,
  }).notNull(),

  plantingDate: date("planting_date").notNull(),

  photoUrl: text("photo_url"),
});

export const wateringLogs = pgTable("watering_logs", {
  id: serial("id").primaryKey(),

  plantId: integer("plant_id")
    .references(() => plants.id)
    .notNull(),

  wateredAt: timestamp("watered_at")
    .defaultNow()
    .notNull(),

  notes: text("notes"),
});

export const fertilizerLogs = pgTable("fertilizer_logs", {
  id: serial("id").primaryKey(),

  plantId: integer("plant_id")
    .references(() => plants.id)
    .notNull(),

  fertilizedAt: timestamp("fertilized_at")
    .defaultNow()
    .notNull(),

  notes: text("notes"),
});