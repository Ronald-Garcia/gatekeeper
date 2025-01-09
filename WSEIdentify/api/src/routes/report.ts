import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createMachineSchema, getMachineByNameSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";
import { exec, execSync, spawnSync } from "node:child_process";
/*
 **********************************
 * ROUTE TO HANDLE PI OPERATIONS. *
 **********************************
 */

const reportRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to send a signal to turn on this current machine.
 * @param email the email to send
 * @returns true if successful.
 */
reportRoutes.get("/reports/:machineName/:email",
  async (c) => {
    const machineName = c.req.param("machineName");
    const email = c.req.param("email");
    const success = await execSync(`python ./email-operations/report.py ${email} ${machineName}`)
    console.log(success.toString());
    const stringResult = success.toString().trim();
    return await c.json({
        success: stringResult.startsWith('s'),
        message: stringResult.split(":")[1]
    })
});

export default reportRoutes;
