import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createMachineSchema, getMachineByNameSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";

/*
 ***************************************
 * ROUTE TO HANDLE MACHINE OPERATIONS. *
 ***************************************
 */

const machineRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to get all machines.
 * @returns all the machines stored.
 */
machineRoutes.get("/machines",
  async (c) => {
    const allMachines = await db.select().from(machinesAvailable);
    return c.json(allMachines);  
});

machineRoutes.get("/machines/:name",
  zValidator("param", getMachineByNameSchema),
  async (c) => {
    const machine = await db.select().from(machinesAvailable).get();
    return c.json(machine);  
});

/*
 *********************
 * DELETE OPERATIONS * 
 ********************* 
 */
machineRoutes.delete("/machines/:name",
  zValidator("param", getMachineByNameSchema),
  async (c) => {
    const { name } = c.req.valid("param");
    const [ deletedMachine ] = await db.delete(machinesAvailable).where(eq(machinesAvailable.name, name)).returning();

    if (!deletedMachine) {
      throw new HTTPException(404, { message: "Machine not found."} );
    }

    return c.json(deletedMachine);
  }
)

/*
 *******************
 * POST OPERATIONS * 
 ******************* 
 */
machineRoutes.post("/machines",
  zValidator("json", createMachineSchema),
  async (c) => {
    const body = c.req.valid("json");

    const [ newMachine ] = await db.insert(machinesAvailable).values(body).returning();

    return c.json(newMachine);
  }
);


export default machineRoutes;
