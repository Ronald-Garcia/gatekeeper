import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * The sqlite table to store all the student accounts of the interlock system.
 * @column jid the unique JID of the account.
 * @column firstname the first name of the account.
 * @column lastname the last name of the account.
 * @column machinePerm the machine permissions number (see WSEIdentify/web/data/types.ts for documentation on the machinePerm)
 * @column banned whether or not the account is banned.
 * @column admin whether or not the account is an admin
 */
export const users = sqliteTable("users", {
    jid: integer("jid").primaryKey(),
    firstname: text("first name").notNull(),
    lastname: text("last name").notNull(),
    machinePerm: integer("machine permissions").notNull(),
    banned: integer("banned").notNull(),
    admin: integer("admin").notNull(),
    jhed: text("JHED").notNull()
});

/**
 * The sqlite table to store all the transactions made by accounts in the interlock system.
 * @column timeSpent the time spent.
 * @column code the budget code that was charged.
 * @column machineUsed the machine that was used.
 * @column userJid the JID of the account that made the transaction.
 */
export const transactions = sqliteTable("transactions", {
    timeSpent: integer("timeSpent").notNull(),
    code: integer("budgetCode").references(() => budgetCodes.id),
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

export const userBudgetRelation = sqliteTable("userBudgetRelation", {
    id: integer("relationId").primaryKey({autoIncrement: true}),
    userId: integer("userId").references(()=>users.jid, {
        onDelete: "cascade"
    }),
    budgetId: integer("budgetId").references(()=>budgetCodes.id, {
        onDelete: "cascade"
    })
})
