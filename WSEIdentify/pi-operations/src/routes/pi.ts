import { Hono } from "hono";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createMachineSchema, getMachineByNameSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";
import { ChildProcess, exec, execSync, spawnSync } from "child_process";
/*
 **********************************
 * ROUTE TO HANDLE PI OPERATIONS. *
 **********************************
 */

const piRoutes = new Hono();

const controller = new AbortController();
const { signal } = controller
let locked = true;
let lock_child: ChildProcess;
let unlock_child: ChildProcess;
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
    if (!locked) {
      throw new HTTPException(400, { message: "Trying to unlock an unlock!"})
    }
    if (lock_child) {
      lock_child.kill()
    }
    locked = !locked;
    unlock_child = exec("python unlock.py", { signal }, (error) => {
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
    if (locked) {
      throw new HTTPException(400, { message: "Trying to lock a lock!"})
    } 
    if (unlock_child) {
      unlock_child.kill()
    }
    locked = !locked;
    lock_child = exec("python lock.py", { signal }, (error) => {
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
