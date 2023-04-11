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
      if (input.guests[0]) input.guests[0].isChild = false;
      return ctx.prisma.registrations.create({
        data: {
          email: input.email,
          guestCount: input.guestCount,
          guests: {
            createMany: {
              data: input.guests,
            },
          },
        },
      });
    }),
});
