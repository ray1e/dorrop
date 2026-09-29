import {z} from "zod";

export const linkSchema = z.object({
    longUrl: z.httpUrl().trim()
});