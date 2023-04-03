import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const registrationsRouter = createTRPCRouter({
  // This needs to be a protected proceedure
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.registrations.findMany();
  }),
});
