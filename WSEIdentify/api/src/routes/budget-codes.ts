import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createBudgetSchema, getBudgetSchema, queryParamsSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";


/*
 **************************************
 * ROUTE TO HANDLE BUDGET OPERATIONS. *
 **************************************
 */

const budgetRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to get all budgets in the data base.
 * TODO: Add pagination and search functions.
 * @returns all the budgets in the data base.
 */
budgetRoutes.get("/budgets", 
  zValidator("query", queryParamsSchema),
  async (c) => {

    //const { sort, search, page = 1, limit = 10}

    const allBudgets = await db.select().from(budgetCodes);
    return c.json(allBudgets);  
});

/**
 * Route to get a specific budget by id.
 * @param id the id of the budget to get.
 * @returns the budget with the id.
 * @throws an 404 HTTP error if not found.
 */
budgetRoutes.get("/budgets/:id", 
  zValidator("param", getBudgetSchema),
  async (c) => {

    const { id } = c.req.valid("param");

    const [ budget ] = await db.select().from(budgetCodes).where(eq(budgetCodes.id, id));
    return c.json(budget);
});


/*
 *******************
 * POST OPERATIONS *
 *******************
 */

/**
 * Route to create a new budget.
 * @json the budget to be added.
 * @returns the budget that was added.
 */
budgetRoutes.post("/budgets", 
  zValidator("json", createBudgetSchema),
  async (c) => {
    const body = c.req.valid("json"); 
    const [ newBudget ] = await db.insert(budgetCodes).values(body).returning();
    return c.json(newBudget, 201);
  }
);


/*
 ********************* 
 * DELETE OPERATIONS *
 *********************
 */

/**
 * Route to delete a specific budget.
 * @param id the id of the budget to be deleted.
 * @returns the budget that was deleted.
 * @throws 404 HTTP error if the budget was not found.
 */
budgetRoutes.delete("/budgets/:id",
  zValidator("param", getBudgetSchema),
  async (c) => {

    const { id } = c.req.valid("param");

    const [ budget ] = await db.delete(budgetCodes).where(eq(budgetCodes.id, id)).returning();

    if (!budget) {
      throw new HTTPException(404, { message: "Budget not found."});
    }

    return c.json(budget);
  }
)

export default budgetRoutes;