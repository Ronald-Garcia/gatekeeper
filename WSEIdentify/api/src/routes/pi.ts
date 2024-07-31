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

const controller = new AbortController();
const { signal } = controller
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
    controller.abort()
    exec("python pi-operations/unlock.py", { signal }, (error) => {
      if(error) {
        console.error(error);
        console.log("Aborted");
      }
    })
    // const stringResult = success.toString().trim();
    // console.log(stringResult)
    return await c.json({
      success: true,
      message: "something"
  })
});

/**
 * Route to send a signal to turn on this current machine.
 * @returns true if successful.
 */
piRoutes.get("/lock",
    async (c) => {
    controller.abort()
    exec("python pi-operations/lock.py", { signal }, (error) => {
      if(error) {
        console.error(error);
        console.log("Aborted");
      }
    })
    // const stringResult = success.toString().trim();
    // console.log(stringResult)
    return await c.json({
        success: true,
        message: "something"
    })
  });

export default piRoutes;
