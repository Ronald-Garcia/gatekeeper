import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createBudgetSchema, getBudgetSchema } from "../validators/schemas";
const budgetRoutes = new Hono();

budgetRoutes.get("/budgets", 
  async (c) => {
    const allBudgets = await db.select().from(budgetCodes);
    return c.json(allBudgets);  
});

budgetRoutes.get("/budgets/:id", 
  zValidator("param", getBudgetSchema),
  async (c) => {

    const { id } = c.req.valid("param");

    const [ budget ] = await db.select().from(budgetCodes).where(eq(budgetCodes.id, id));
    return c.json(budget);
});

budgetRoutes.post("/budgets", 
  zValidator("json", createBudgetSchema),
  async (c) => {
    const body = c.req.valid("json"); 
    const [ newBudget ] = await db.insert(budgetCodes).values(body).returning();
    return c.json(newBudget, 201);
  }
)

budgetRoutes.delete("/budgets/:id",
  zValidator("param", getBudgetSchema),
  async (c) => {

    const { id } = c.req.valid("param");

    const [ budget ] = await db.delete(budgetCodes).where(eq(budgetCodes.id, id)).returning();

    return c.json(budget);
  }
)

export default budgetRoutes;