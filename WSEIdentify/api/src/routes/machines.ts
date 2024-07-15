import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

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
    try {
        const allMachines = await db.select().from(machinesAvailable);
        return c.json(allMachines);  
      } catch (err) {
        console.error(err);
        return c.json({ message: "Failed to fetch machines due to unexpected error(s)."}, 500);
      }
});

machineRoutes.get("/machines/:name", async (c) => {
    
})

export default machineRoutes;
