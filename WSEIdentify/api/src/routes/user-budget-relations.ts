import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes, userBudgetRelation, users } from "../db/schema";
import { eq, or, and, exists } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema, createBudgetSchema, getBudgetSchema, getRelationSchema, createRelationSchema, updateRelationSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";

/*
 ****************************************
 * ROUTE TO HANDLE RELATION OPERATIONS. *
 ****************************************
 */
const relationRoutes = new Hono();


/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to get all the budgets of a user.
 * @param jid the id of the user.
 * @returns the budgets that are related to the user.
 * @throws 404 HTTP Exception if no budgets are found.
 */
relationRoutes.get("/users/:jid/budgets",
    zValidator("param", getUserByJIDSchema),
    async (c) => {
      const { jid } = c.req.valid("param");
      const budgets = await db.select().from(budgetCodes).where(exists(db.select().from(userBudgetRelation).where(and(eq(userBudgetRelation.userId, jid), eq(userBudgetRelation.budgetId, budgetCodes.id)))));
      
      if (!budgets) {
        throw new HTTPException(404, { message: "No budgets found"});
      }
  
      return c.json(budgets);
    }
  )

/**
 * Route to get all the users assigned to a budget.
 * @param budgetId the id of the budget.
 * @returns the users that are related to the budget.
 * @throws 404 HTTP Exception if no users are found.
 */
relationRoutes.get("/budgets/:budgetId/users",
    zValidator("param", getBudgetSchema),
    async (c) => {
      const { id: budgetId } = c.req.valid("param");
      const usersOfBudget = await db.select().from(users).where(exists(db.select().from(userBudgetRelation).where(and(eq(userBudgetRelation.userId, users.jid), eq(userBudgetRelation.budgetId, budgetId)))));
  
      if (!usersOfBudget) {
        throw new HTTPException(404, { message: "No users found"});
      }
  
      return c.json(usersOfBudget);
    }
  )

/**
 * Route to get a specific relation.
 * @param jid the id of the user.
 * @param budgetId the id of the budget.
 * @returns the relation that corresponds to these two elements.
 * @throws 404 HTTP Exception if no relation was found.
 */
relationRoutes.get("/users/:jid/budgets/:budgetId", 
  zValidator("param", getRelationSchema),
  async (c) => {
    const { userId: jid, budgetId } = c.req.valid("param");
    const [ relation  ] = await db.select().from(userBudgetRelation).where(and(eq(users.jid, jid), eq(budgetCodes.id, budgetId))); 

    if (!relation) {
      throw new HTTPException(404, { message: "Relation not found"}) // HTTP Status code 200 "Ok"
    }
    return c.json(relation);
});


/*
 *******************
 * POST OPERATIONS *
 *******************
 */

/**
 * Route to add a relation.
 * @json the relation to add.
 * @returns the relation that was added.
 */
relationRoutes.post("/users/budgets",
    zValidator("json", createRelationSchema),
    async (c) => {
        const body = c.req.valid("json");

        const [ relation ] = await db.insert(userBudgetRelation).values(body).returning();

        return c.json(relation);
    }
);


/*
 *********************
 * DELETE OPERATIONS *
 *********************
 */

/**
 * Route to delete a relation.
 * @param userId the id of the user.
 * @param budgetId the id of the budget.
 * @returns the budget that was deleted.
 * @throws 404 HTTP Exception if no relation was found.
 */
relationRoutes.delete("/users/:userId/budgets/:budgetId", 
    zValidator("param", getRelationSchema),
    async (c) => {
      const { userId, budgetId } = c.req.valid("param");
      
      const [ deletedRelation ] = await db.delete(userBudgetRelation).where(and(eq(userBudgetRelation.userId, userId), eq(userBudgetRelation.budgetId, budgetId))).returning();
      
      if (!deletedRelation) {
        throw new HTTPException(404, { message: "Relation not found."});
      }
      return c.json(deletedRelation);  
});

/*
 ********************
 * PATCH OPERATIONS *
 ********************
 */
/**
 * ---- NOT USED ----
 * Route to update a relation.
 * @param userId the id of the user.
 * @param budgetId the id of the budget.
 * @returns the budget that was deleted.
 * @throws 404 HTTP Exception if no relation was found.
 */
relationRoutes.patch("/users/:jid/budgets/:budgetId",
  zValidator("param", getRelationSchema),
  zValidator("json", updateRelationSchema),
  async (c) => {

    const { userId: jid, budgetId } = c.req.valid("param"); 
    const body = c.req.valid("json");
    // UPDATE posts SET content = :content WHERE id = :id
    const [ updatedRelation ] = await db.update(userBudgetRelation).set(body).where(and(eq(userBudgetRelation.userId, jid), eq(userBudgetRelation.budgetId, budgetId))).returning();
    if (!updatedRelation) {
      throw new HTTPException(404, { message: "Relation not found" });
    }
    return c.json(updatedRelation);
  });

  export default relationRoutes;

