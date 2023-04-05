import { z } from "zod";

import {
  createTRPCRouter,
  // privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const registrationsRouter = createTRPCRouter({
  // This needs to be a protected proceedure
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.registrations.findMany();
  }),

  registrationCreate: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const registration = await ctx.prisma.registrations.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
      });
      console.log(registration);
    }),
});
