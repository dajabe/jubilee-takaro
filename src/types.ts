import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allRegistrationsOutput = RouterOutput["registrations"];

export type Registration = allRegistrationsOutput;

export const registrationInput = z.object({
  email: z.string().email(),
  guests: z
    .object({
      isChild: z.boolean(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      ticketType: z.string().min(4).max(8),
    })
    .array(),
});
