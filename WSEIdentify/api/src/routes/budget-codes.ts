import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { createBudgetSchema } from "../validators/schemas";
const budgetRoutes = new Hono();

budgetRoutes.get("/budgets", 
  cors(),
  async (c) => {
    try {   
        const allBudgets = await db.select().from(budgetCodes);
        return c.json(allBudgets);  
      } catch (err) {
        console.error(err);
        return c.json({ message: "Failed to fetch budgets due to unexpected error(s)."}, 500);
      }
});

budgetRoutes.get("/budgets/:code", async (c) => {
    
});

budgetRoutes.post("/budgets", 
  zValidator("json", createBudgetSchema),
  cors(),
  async (c) => {
    const body = c.req.valid("json"); 
    const [ newBudget ] = await db.insert(budgetCodes).values(body).returning();
    return c.json(newBudget, 201);
  }
)

export default budgetRoutes;