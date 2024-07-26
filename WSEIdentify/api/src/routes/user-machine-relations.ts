import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes, machinesAvailable, userBudgetRelation, userMachineRelation, users } from "../db/schema";
import { eq, or, and, exists } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema, createBudgetSchema, getBudgetSchema, getBudgetRelationSchema, createBudgetRelationSchema, updateBudgetRelationSchema, getMachineByNameSchema, getMachineById, getMachineRelationSchema, createMachineRelationSchema, updateMachineRelationSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";

/*
 ****************************************
 * ROUTE TO HANDLE RELATION OPERATIONS. *
 ****************************************
 */

const machineRelationRoutes = new Hono();


/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to get all the budgets of a user.
 * @param jid the id of the user.
 * @returns the machines that are related to the user.
 */
machineRelationRoutes.get("/users/:jid/machines",
    zValidator("param", getUserByJIDSchema),
    async (c) => {
      const { jid } = c.req.valid("param");
      const machines = await db.select().from(machinesAvailable).where(exists(db.select().from(userMachineRelation).where(and(eq(userMachineRelation.userId, jid), eq(userMachineRelation.machineId, machinesAvailable.id)))));
        
      return c.json(machines);
    }
  )

/**
 * Route to get all the users assigned to a budget.
 * @param machineName the id of the budget.
 * @returns the users that are related to the budget.
 * @throws 404 HTTP Exception if no users are found.
 */
machineRelationRoutes.get("/machines/:machineName/users",
    zValidator("param", getMachineById),
    async (c) => {
      const { machineId } = c.req.valid("param");
      const usersOfMachine = await db.select().from(users).where(exists(db.select().from(userMachineRelation).where(and(eq(userMachineRelation.userId, users.jid), eq(userMachineRelation.machineId, machineId)))));
  
      if (!usersOfMachine) {
        throw new HTTPException(404, { message: "No users found"});
      }
  
      return c.json(usersOfMachine);
    }
  )

/**
 * Route to get a specific relation.
 * @param jid the id of the user.
 * @param machineId the id of the machine.
 * @returns the relation that corresponds to these two elements.
 * @throws 404 HTTP Exception if no relation was found.
 */
machineRelationRoutes.get("/users/:jid/machines/:machineId", 
  zValidator("param", getMachineRelationSchema),
  async (c) => {
    const { userId: jid, machineId } = c.req.valid("param");
    const [ relation  ] = await db.select().from(userMachineRelation).where(and(eq(users.jid, jid), eq(machinesAvailable.id, machineId))); 

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
machineRelationRoutes.post("/users/machines",
    zValidator("json", createMachineRelationSchema),
    async (c) => {
        const body = c.req.valid("json");

        const [ relation ] = await db.insert(userMachineRelation).values(body).returning();

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
 * @param machineId the id of the machine.
 * @returns the budget that was deleted.
 * @throws 404 HTTP Exception if no relation was found.
 */
machineRelationRoutes.delete("/users/:userId/machines/:machineId", 
    zValidator("param", getMachineRelationSchema),
    async (c) => {
      const { userId, machineId } = c.req.valid("param");
      
      const [ deletedRelation ] = await db.delete(userMachineRelation).where(and(eq(userMachineRelation.userId, userId), eq(userMachineRelation.machineId, machineId))).returning();
      
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
 * @param machineId the id of the machine.
 * @returns the machine that was deleted.
 * @throws 404 HTTP Exception if no relation was found.
 */
machineRelationRoutes.patch("/users/:jid/machines/:machineId",
  zValidator("param", getMachineRelationSchema),
  zValidator("json", updateMachineRelationSchema),
  async (c) => {

    const { userId: jid, machineId } = c.req.valid("param"); 
    const body = c.req.valid("json");
    // UPDATE posts SET content = :content WHERE id = :id
    const [ updatedRelation ] = await db.update(userMachineRelation).set(body).where(and(eq(userMachineRelation.userId, jid), eq(userMachineRelation.machineId, machineId))).returning();
    if (!updatedRelation) {
      throw new HTTPException(404, { message: "Relation not found" });
    }
    return c.json(updatedRelation);
  });

  export default machineRelationRoutes;

