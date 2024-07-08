import { Hono } from "hono";
import { db } from "../db";
import { budgetCharges } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import {  } from "../validators/schemas";
const budgetRoutes = new Hono();

budgetRoutes.get("/budgets/", async (c) => {
    try {
        c.header("Access-Control-Allow-Origin", "*");
    
        const allBudgets = await db.select().from(budgetCharges);
        return c.json(allBudgets);  
      } catch (err) {
        console.error(err);
        return c.json({ message: "Failed to fetch budgets due to unexpected error(s)."}, 500);
      }
});

budgetRoutes.get("/budgets/:code", async (c) => {
    
})