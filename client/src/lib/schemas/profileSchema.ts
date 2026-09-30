import { z } from "zod";
import { requiredString } from "../util/util";

export const profileSchema = z.object({
  displayName: requiredString("Display name"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
