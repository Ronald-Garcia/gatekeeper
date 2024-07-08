import { db, connection } from "./index";
import { users } from "./schema";

async function seed() {
  console.log("Seeding the database...");

  // Clean the tables
  console.log("Cleaning existing data...");
  await db.delete(users);

  console.log("Inserting new seed data...");
  // Insert sample posts
  const [user1] = await db
    .insert(users)
    .values({
      jid: 4747487874,
      firstname: "Ronald",
      lastname: "Garcia",
      machinePerms: 0xb011,
      banned: 0,
      admin: 1
    })
    .returning({ id: users.jid });

  const [user2] = await db
    .insert(users)
    .values({
        jid: 9383737,
        firstname: "Bob",
        lastname: "Bob",
        machinePerms: 0xb000,
        banned: 1,
        admin: 0
    })
    .returning({ id: users.jid });

  const [user3] = await db
    .insert(users)
    .values({
        jid: 76525252,
        firstname: "Stacy",
        lastname: "Macy",
        machinePerms: 0xb111,
        banned: 0,
        admin: 1
    })
    .returning({ id: users.jid });

  console.log("Seeding completed successfully.");
}

seed()
  .catch((e) => {
    console.error("Seeding failed:");
    console.error(e);
  })
  .finally(() => {
    connection.close();
  });