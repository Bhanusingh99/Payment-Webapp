import { z } from "zod";

export const createUserSchema = z.object({
    userName: z.string().min(3).max(30),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    password: z.string().min(6),
});
