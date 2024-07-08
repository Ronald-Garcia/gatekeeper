import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    jid: integer("jid").primaryKey(),
    firstname: text("first name").notNull(),
    lastname: text("last name").notNull(),
    machinePerms: integer("machine permissions").notNull(),
    banned: integer("banned").notNull(),
    admin: integer("admin").notNull(),
});