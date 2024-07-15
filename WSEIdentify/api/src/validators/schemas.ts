import { z } from "zod";

export const createUserSchema = z.object({
    jid: z.coerce.number().nonnegative().int(),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    machinePerm: z.coerce.number().int().max(0x1111, "Invalid permissions number.").nonnegative(),
    banned: z.coerce.number().int().min(0).max(1),
    admin: z.coerce.number().int().min(0).max(1),
    jhed: z.string().min(1, "JHED is required"),
})

export const updateUserSchema = createUserSchema.partial();

export const getUserByJIDSchema = z.object({
    jid: z.coerce.number().int().nonnegative(),
})

export const createBudgetSchema = z.object({
    id: z.coerce.number().int().positive(),
    alias: z.string().min(1, "Alias is required"),
    isSeniorDesign: z.coerce.number().int().max(1).nonnegative(),
    isClass: z.coerce.number().int().nonnegative().max(1),
    isLab: z.coerce.number().int().nonnegative().max(1),
})

export const updateBudgetSchema = createBudgetSchema.partial();


export const getBudgetSchema = z.object({
    id: z.coerce.number().int().positive()
})

export const getRelationSchema = z.object({
    userId: z.coerce.number().int().positive(),
    budgetId: z.coerce.number().int().positive()
})

export const createRelationSchema = getRelationSchema;
export const updateRelationSchema = createRelationSchema.partial();