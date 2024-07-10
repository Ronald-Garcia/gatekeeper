import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    jid: integer("jid").primaryKey(),
    firstname: text("first name").notNull(),
    lastname: text("last name").notNull(),
    machinePerm: integer("machine permissions").notNull(),
    banned: integer("banned").notNull(),
    budgetCodes: text("budgetAliases", { mode: 'json' }),
    admin: integer("admin").notNull(),
});

export const budgetCharges = sqliteTable("budgetCharges", {
    timeSpent: integer("timeSpent").notNull(),
    budgetCode: integer("bCode").references(() => budgetCodes.id),
    machineUsed: integer("machine").notNull(),
    userJid: integer("userJid").references(() => users.jid),
});

export const budgetCodes = sqliteTable("budgetCodes", {
    id: integer("budgetCode").primaryKey(),
    alias: text("alias"),
    isSeniorDesign: integer("isSeniorDesign").default(0),
    isLab: integer("isLab").default(0),
    isClass: integer("isClass").default(1)
});

export const machinesAvailable = sqliteTable("machines", {
    name: text("name").primaryKey(),
    rate: integer("hourly rate").notNull(),
})