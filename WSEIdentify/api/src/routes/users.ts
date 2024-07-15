import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes, userBudgetRelation, users } from "../db/schema";
import { eq, or } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema, createBudgetSchema, getBudgetSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";


/*
 ************************************
 * ROUTE TO HANDLE USER OPERATIONS. *
 ************************************
 */
const userRoutes = new Hono();


/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */

/**
 * Route to get all users.
 * @returns all the users stored.
 */
userRoutes.get("/users",
    async (c) => {

    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  });

/**
 * Route to get a specific user.
 * @param jid the id of the user.
 * @returns the user.
 */
userRoutes.get("/users/:jid", 
  zValidator("param", getUserByJIDSchema),
  async (c) => {
    const { jid } = c.req.valid("param");
    const [ user ] = await db.select().from(users).where(eq(users.jid, jid)); 

    if (!user) {
      throw new HTTPException(404, { message: "User not found"}) // HTTP Status code 200 "Ok"
    }
    return c.json(user);
});


/*
 ******************* 
 * POST OPERATIONS *
 *******************
 */

/**
 * Route to add a user.
 * @json the user to add.
 * @returns the added user.
 */
userRoutes.post("/users", 
  zValidator("json", createUserSchema),
  async (c) => {

    const body = c.req.valid("json"); 
    const [ newUser ] = await db.insert(users).values(body).returning();

    return c.json(newUser, 201);  
  
});

/*
 ********************* 
 * DELETE OPERATIONS *
 *********************
 */

/**
 * Route to delete a specific user.
 * @param jid the id of the user.
 * @returns the user that was deleted.
 */
userRoutes.delete("/users/:id", 
    zValidator("param", getUserByJIDSchema),
    async (c) => {
      const { jid } = c.req.valid("param");
      // DELETE FROM posts WHERE id = :id
      const [ deletedUser ] = await db.delete(users).where(eq(users.jid, jid)).returning();
      
      if (!deletedUser) {
        throw new HTTPException(404, { message: "User not found."});
      }
      return c.json(deletedUser);  
});


/*
 ******************** 
 * PATCH OPERATIONS *
 ********************
 */

 /**
  * Route to update a user.
  * @param jid the id of the user to update.
  * @json the new data to update.
  * @returns the updated user.
  * @throws 404 HTTP exception if user not found.
  */
userRoutes.patch("/users/:jid",
  zValidator("param", getUserByJIDSchema),
  zValidator("json", updateUserSchema),
  async (c) => {

    const { jid } = c.req.valid("param"); 
    const body = c.req.valid("json");
    // UPDATE posts SET content = :content WHERE id = :id
    const [ updatedUser ] = await db.update(users).set(body).where(eq(users.jid, jid)).returning();
    if (!updatedUser) {
      throw new HTTPException(404, { message: "User not found" });
    }
    return c.json(updatedUser);
  });




  export default userRoutes;

