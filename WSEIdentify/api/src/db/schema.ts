import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * The sqlite table to store all the student accounts of the interlock system.
 * @primary jid the unique JID of the account.
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
    jhed: text("JHED").notNull().unique()
});

/**
 * The sqlite table to store all the transactions made by accounts in the interlock system.
 * @primary id the id of the transaction.
 * @column timeSpent the time spent.
 * @foreign code the budget code that was charged.
 * @foreign machineUsed the machine that was used.
 * @foreign userJid the JID of the account that made the transaction.
 * @column date the date the transaction was made.
 */
export const transactions = sqliteTable("transactions", {
    id: integer("id").primaryKey(),
    timeSpent: integer("timeSpent").notNull(),
    code: integer("budgetCode").references(() => budgetCodes.id),
    machineUsed: integer("machine").references(()=>machinesAvailable.id, { onDelete: "no action" }),
    userJHED: text("userJHED").references(() => users.jhed),
    date: integer("dateAdded", { mode: "timestamp"}).notNull(),
});


/**
 * The sqlite table to store all the budget codes of the interlock system.
 * @primary id the id of the budget code.
 * @column alias the alias of the budget code.
 * @column whether or not this code is a senior design team.
 * @column whether or not this code is a lab.
 * @column whether or not this code is a class. 
 */
export const budgetCodes = sqliteTable("budgetCodes", {
    id: integer("budgetCode").primaryKey({ autoIncrement: true }),
    alias: text("alias"),
    isSeniorDesign: integer("isSeniorDesign").default(0),
    isLab: integer("isLab").default(0),
    isClass: integer("isClass").default(1)
});

/**
 * The sqlite table to store all the machines that are registered with the interlock system.
 * @primary id the id of the machine.
 * @column name the name of the machine.
 * @column rate the hourly rate of the machine.
 */
export const machinesAvailable = sqliteTable("machines", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    rate: integer("hourly rate").notNull(),
})

/**
 * The sqlite join table to relate users and budgets.
 * @primary id the id of the relation.
 * @foreign userId the id of the account that is referenced.
 * @foreign budgetId the id of the budget that is referenced.
 */
export const userBudgetRelation = sqliteTable("userBudgetRelation", {
    id: integer("relationId").primaryKey({autoIncrement: true}),
    userId: integer("userId").references(()=>users.jid, {
        onDelete: "cascade"
    }),
    budgetId: integer("budgetId").references(()=>budgetCodes.id, {
        onDelete: "cascade"
    })
})
