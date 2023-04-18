import { createTRPCRouter } from "~/server/api/trpc";
import { registrationsRouter } from "./routers/registrations";
import { sengridRouter } from "./routers/sendgrid";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  registrations: registrationsRouter,
  sendgrid: sengridRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
