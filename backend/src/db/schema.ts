import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  timestamp,
  date,
  mysqlEnum,
  datetime,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  email: varchar("email", { length: 100 }).notNull(),

  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plantTypes = mysqlTable("plant_types", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  wateringInterval: int("watering_interval").notNull(),

  fertilizingInterval: int("fertilizing_interval").notNull(),

  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const plants = mysqlTable("plants", {
  id: serial("id").primaryKey(),

  userId: int("user_id").notNull(),

  plantTypeId: int("plant_type_id").notNull(),

  nickname: varchar("nickname", { length: 100 }).notNull(),

  plantingDate: date("planting_date"),

  location: varchar("location", { length: 100 }),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const activityLogs = mysqlTable("activity_logs", {
  id: serial("id").primaryKey(),

  plantId: int("plant_id").notNull(),

  activityType: mysqlEnum("activity_type", [
    "watering",
    "fertilizing",
  ]).notNull(),

  activityDate: datetime("activity_date").notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});