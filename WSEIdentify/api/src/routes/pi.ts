import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createMachineSchema, getMachineByNameSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";
import { exec, execSync, spawnSync } from "child_process";
/*
 **********************************
 * ROUTE TO HANDLE PI OPERATIONS. *
 **********************************
 */

const piRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to send a signal to turn on this current machine.
 * @returns true if successful.
 */
piRoutes.get("/unlock",
  async (c) => {
    const success = await execSync("python ./pi-operations/unlock.py")
    const stringResult = success.toString().trim();
    return await c.json({
        success: stringResult.startsWith('s'),
        message: stringResult.split(":")[1]
    })
});

/**
 * Route to send a signal to turn on this current machine.
 * @returns true if successful.
 */
piRoutes.get("/lock",
    async (c) => {
      const success = await execSync("python ./pi-operations/lock.py")
      const stringResult = success.toString().trim();
      return await c.json({
          success: stringResult.startsWith('s'),
          message: stringResult.split(":")[1]
      })
  });
  

/*
 *********************
 * DELETE OPERATIONS * 
 ********************* 
 */
piRoutes.delete("/machines/:name",
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
piRoutes.post("/machines",
  zValidator("json", createMachineSchema),
  async (c) => {
    const body = c.req.valid("json");

    const [ newMachine ] = await db.insert(machinesAvailable).values(body).returning();

    return c.json(newMachine);
  }
);


export default piRoutes;
