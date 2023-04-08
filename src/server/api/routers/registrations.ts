import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registrationInput } from "~/types";

export const registrationsRouter = createTRPCRouter({
  // This needs to be a protected proceedure
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.registrations.findMany();
  }),

  create: publicProcedure
    .input(registrationInput)
    .mutation(({ ctx, input }) => {
      console.log({ input });
      return ctx.prisma.registrations.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
      });
    }),
});
