import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allRegistrationsOutput = RouterOutput["registrations"]["getAll"];

export type Registration = allRegistrationsOutput[number];

export const registrationInput = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  ticketType: z.string().min(4).max(8),
  email: z.string().email(),
});