import { z } from "zod";
export const regSchema = z.object({
    name: z.string().trim().min(2).max(60),
    email: z.string().email(),
    phone: z.string().regex(/^\+380\d{9}$/, "Format: +380XXXXXXXXX"),
    position_id: z.number().positive(),
    photo: z.instanceof(File),
});
