import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    jid: integer("jid").primaryKey(),
    firstname: text("first name").notNull(),
    lastname: text("last name").notNull(),
    machinePerms: integer("machine permissions").notNull(),
    banned: integer("banned").notNull(),
    budgetCodes: text("budgetCodes", { mode: 'json' }).references(() => budgetCodes.names),
    admin: integer("admin").notNull(),
});

export const budgetCharges = sqliteTable("budgetCharges", {
    timeSpent: integer("timeSpent").notNull(),
    budgetCode: text("budgetCodes", { mode: 'json' }).references(() => budgetCodes.names),
    machineUsed: integer("machine").notNull(),
    userJid: integer("userJid").references(() => users.jid),
});

export const budgetCodes = sqliteTable("budgetCodes", {
    names: text("name(s)").primaryKey(),
    isSeniorDesign: integer("isSeniorDesign").default(0),
    isLab: integer("isLab").default(0),
    isClass: integer("isClass").default(1)
});