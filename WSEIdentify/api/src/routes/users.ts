import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema } from "../validators/schemas";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
const userRoutes = new Hono();

userRoutes.get("/users",
    cors(),
    async (c) => {

    const allUsers = await db.select().from(users);
    return c.json(allUsers);  

  });

userRoutes.get("/users/:jid", 
  cors(),
  zValidator("param", getUserByJIDSchema),
  async (c) => {
    const { jid } = c.req.valid("param");
    const [ user ] = await db.select().from(users).where(eq(users.jid, jid)); 

    if (!user) {
      throw new HTTPException(404, { message: ""}) // HTTP Status code 200 "Ok"
    }
    return c.json(user);
});

userRoutes.delete("/users/:id", 
    cors(),
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

userRoutes.post("/users", 
  cors({
    origin: "*"
  }),
  zValidator("json", createUserSchema),
  async (c) => {

    const body = c.req.valid("json"); 
    const [ newUser ] = await db.insert(users).values(body).returning();

    return c.json(newUser, 201);  
  
});

userRoutes.patch("/users/:jid",
  cors(),
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

userRoutes.patch("/users/:jid/budget",
  cors(),
  zValidator("param", getUserByJIDSchema),
  async (c) => {

    const { jid } = c.req.valid("param");

    const { budgetCodes } = await c.req.json();

    const [ updatedUser ] = await db.update(users).set({
      budgetCodes
    }).where(eq(users.jid, jid)).returning();

    if (!updatedUser) {
      throw new HTTPException(404, { message: "User not found."});
    }

    return c.json(updatedUser);
  });

export default userRoutes;
