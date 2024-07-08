import { z } from "zod";

export const createUserSchema = z.object({
    jid: z.number().nonnegative().int(),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    machinePerms: z.number().max(0x111, "Invalid permissions number.").nonnegative(),
    banned: z.number().int().min(0).max(1),
    admin: z.number().int().min(0).max(1)
})

export const updateUserSchema = createUserSchema.partial();

export const getUserByJIDSchema = z.object({
    jid: z.coerce.number().int().nonnegative(),
})