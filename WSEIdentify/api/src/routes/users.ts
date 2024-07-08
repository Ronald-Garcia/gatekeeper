import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema, getUserByJIDSchema } from "../validators/schemas";
const userRoutes = new Hono();

userRoutes.get("/users", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);  
  } catch (err) {
    console.error(err);
    return c.json({ message: "Failed to fetch users due to unexpected error(s)."}, 500);
  }
});

userRoutes.get("/users/:jid", 
  zValidator("param", getUserByJIDSchema),
  async (c) => {
  try {
    const { jid } = c.req.valid("param");
    const [ user ] = await db.select().from(users).where(eq(users.jid, jid)); 

    if (user) {
      return c.json(user); // HTTP Status code 200 "Ok"
    }
    return c.json({ error: "User not found" }, 404);
  } catch (err) {
    return c.json({message: "Unexpected error"}, 500);
  }

});

userRoutes.delete("/users/:id", 
    
    zValidator("param", getUserByJIDSchema),
    async (c) => {

  try {
    const { jid } = c.req.valid("param");
    // DELETE FROM posts WHERE id = :id
    const [ deletedUser ] = await db.delete(users).where(eq(users.jid, jid)).returning();
    
    if (!deletedUser) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(deletedUser);  
  } catch (err) {
    return c.json({message: "Unexpected error"}, 500);
  }
});

userRoutes.post("/users", 
  
  zValidator("json", createUserSchema),
  async (c) => {
    try {
      const body = c.req.valid("json"); 
      //                   ORDER  MATTERS!
      // INSERT INTO posts (content, date) VALUES (:content, :date)
      const [ newUser ] = await db.insert(users).values(body).returning();
      return c.json(newUser, 201);  
    } catch (err) {
      return c.json({message: "Unexpected error"}, 500);
    }
});

userRoutes.patch("/users/:jid",
  zValidator("param", getUserByJIDSchema),
  zValidator("json", updateUserSchema),
  async (c) => {

  try {
    const { jid } = c.req.valid("param"); 
    const body = c.req.valid("json");
    // UPDATE posts SET content = :content WHERE id = :id
    const [ updatedUser ] = await db.update(users).set(body).where(eq(users.jid, jid)).returning();
    if (!updatedUser) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(updatedUser);
  } catch (err) {
    return c.json({message: "Unexpected error"}, 500);
  }
});

export default userRoutes;
