import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes, userBudgetRelation, users } from "../db/schema";
import { eq, or, and } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema, createBudgetSchema, getBudgetSchema, getRelationSchema, createRelationSchema, updateRelationSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";
const relationRoutes = new Hono();


relationRoutes.get("/users/:jid/budgets",
    zValidator("param", getUserByJIDSchema),
    async (c) => {
      const { jid } = c.req.valid("param");
      const budgets = await db.select().from(userBudgetRelation).where(eq(userBudgetRelation.userId, jid));
  
      if (!budgets) {
        throw new HTTPException(404, { message: "No budgets found"});
      }
  
      return c.json(budgets);
    }
  )

  relationRoutes.get("/budgets/:budgetId/users",
    zValidator("param", getBudgetSchema),
    async (c) => {
      const { id: budgetId } = c.req.valid("param");
      const usersOfBudget = await db.select().from(userBudgetRelation).where(eq(userBudgetRelation.budgetId, budgetId));
  
      if (!usersOfBudget) {
        throw new HTTPException(404, { message: "No users found"});
      }
  
      return c.json(usersOfBudget);
    }
  )

relationRoutes.get("/users/:jid/budgets/:budgetId", 
  zValidator("param", getRelationSchema),
  async (c) => {
    const { jid, budgetId } = c.req.valid("param");
    const [ relation  ] = await db.select().from(userBudgetRelation).where(and(eq(users.jid, jid), eq(budgetCodes.id, budgetId))); 

    if (!relation) {
      throw new HTTPException(404, { message: "Relation not found"}) // HTTP Status code 200 "Ok"
    }
    return c.json(relation);
});

relationRoutes.post("/users/budgets",
    zValidator("json", createRelationSchema),
    async (c) => {
        const body = c.req.valid("json");

        const [ relation ] = await db.insert(userBudgetRelation).values(body).returning();

        if (!relation) {
            throw new HTTPException(500, {message: "Something went wrong"});
        }

        return c.json(relation);
    }
)

relationRoutes.delete("/users/:jid/budgets/:budgetId", 
    zValidator("param", getRelationSchema),
    async (c) => {
      const { jid, budgetId } = c.req.valid("param");
      
      const [ deletedRelation ] = await db.delete(userBudgetRelation).where(and(eq(userBudgetRelation.userId, jid), eq(userBudgetRelation.budgetId, budgetId))).returning();
      
      if (!deletedRelation) {
        throw new HTTPException(404, { message: "Relation not found."});
      }
      return c.json(deletedRelation);  
});


relationRoutes.patch("/users/:jid/budgets/:budgetId",
  zValidator("param", getRelationSchema),
  zValidator("json", updateRelationSchema),
  async (c) => {

    const { jid, budgetId } = c.req.valid("param"); 
    const body = c.req.valid("json");
    // UPDATE posts SET content = :content WHERE id = :id
    const [ updatedRelation ] = await db.update(userBudgetRelation).set(body).where(and(eq(userBudgetRelation.userId, jid), eq(userBudgetRelation.budgetId, budgetId))).returning();
    if (!updatedRelation) {
      throw new HTTPException(404, { message: "Relation not found" });
    }
    return c.json(updatedRelation);
  });

  export default relationRoutes;

