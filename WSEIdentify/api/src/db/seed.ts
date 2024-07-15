import { db, connection } from "./index";
import { users, machinesAvailable, budgetCodes, userBudgetRelation } from "./schema";

async function seed() {
  console.log("Seeding the database...");

  // Clean the tables
  console.log("Cleaning existing data...");
  await db.delete(users);
  await db.delete(machinesAvailable);
  await db.delete(budgetCodes);
  await db.delete(userBudgetRelation);

  console.log("Inserting new seed data...");
  const [budget1] = await db
      .insert(budgetCodes)
      .values({
        id: 1000001,
        alias: "FRESHMAN LAB"
      }).returning();

      const [budget2] = await db
      .insert(budgetCodes)
      .values({
        id: 20000003,
        alias: "SD-26",
        isSeniorDesign: 1,
        isClass: 0,
      }).returning();
      
      const [budget3] = await db
      .insert(budgetCodes)
      .values({
        id: 30000004,
        alias: "Lab 1",
        isLab: 1,
        isClass: 0,
      }).returning();
      
  // Insert sample posts
  const [user1] = await db
    .insert(users)
    .values({
      jid: 6010675004172191,
      firstname: "Ronald",
      lastname: "Garcia",
      machinePerm: 0b1011,
      banned: 0,
      admin: 1,
    })
    .returning({ id: users.jid });

  const [user2] = await db
    .insert(users)
    .values({
        jid: 9383737,
        firstname: "Bob",
        lastname: "Bob",
        machinePerm: 0b0000,
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
        machinePerm: 0b0111,
        banned: 0,
        admin: 1
    })
    .returning({ id: users.jid });
    

    const [machine1] = await db
      .insert(machinesAvailable)
      .values({
        name: "Mill 1",
        rate: 35
      }).returning( {name: machinesAvailable.name});

      const [machine2] = await db
      .insert(machinesAvailable)
      .values({
        name: "Mill 2",
        rate: 35
      }).returning( {name: machinesAvailable.name});

      const [machine3] = await db
      .insert(machinesAvailable)
      .values({
        name: "Lathe 1",
        rate: 35
      }).returning( {name: machinesAvailable.name});

      const [machine4] = await db
      .insert(machinesAvailable)
      .values({
        name: "Lathe 2",
        rate: 35
      }).returning( {name: machinesAvailable.name});

      const [link1] = await db
      .insert(userBudgetRelation)
      .values({
        userId: user2.id,
        budgetId: budget2.id
      }).returning();

      const [link2] = await db
      .insert(userBudgetRelation)
      .values({
        userId: user2.id,
        budgetId: budget1.id
      }).returning();

      const [link3] = await db
      .insert(userBudgetRelation)
      .values({
        userId: user1.id,
        budgetId: budget3.id
      }).returning();

      const [link4] = await db
      .insert(userBudgetRelation)
      .values({
        userId: user3.id,
        budgetId: budget2.id
      }).returning();

      const [link5] = await db
      .insert(userBudgetRelation)
      .values({
        userId: user3.id,
        budgetId: budget3.id
      }).returning();

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