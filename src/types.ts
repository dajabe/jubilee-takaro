import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";
import { emailAddresses } from "@clerk/clerk-sdk-node";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allRegistrationsOutput = RouterOutput["registrations"];

export type Registration = allRegistrationsOutput;

export const guestsInput = z
  .object({
    isChild: z.boolean(),
    firstName: z.string().min(1, { message: "Please enter a first name" }),
    lastName: z.string().min(1, { message: "Please enter a last name" }),
    ticketType: z.string().min(4).max(8),
  })
  .array();

export const registrationInput = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" })
    .refine(
      (e) => {
        return true;
      },
      { message: "Email address unreachable" }
    ),
  amount: z.number(),
  guests: guestsInput,
});

export type RegistrationSchema = z.infer<typeof registrationInput>;

export type GuestSchema = z.infer<typeof guestsInput>;
