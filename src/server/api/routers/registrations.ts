// import { z } from "zod";
import sendgrid, { type MailDataRequired } from "@sendgrid/mail";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registrationInput } from "~/types";
import { generateAdminEmail, generateGuestEmail } from "~/utils/generateEmail";

if (process.env.SENDGRID_API_KEY)
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const registrationsRouter = createTRPCRouter({
  // This needs to be a protected proceedure
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.registrations.findMany();
  // }),

  create: publicProcedure
    .input(registrationInput)
    .mutation(async ({ ctx, input }) => {
      if (input.guests[0]) input.guests[0].isChild = false;

      const emailGuestData: MailDataRequired = {
        to: input.email,
        from: "takarojubilee@dajabe.nz",
        subject: "Takaro 50th Jubilee Registration",
        html: generateGuestEmail(input.guests),
      };

      const emailAdminData: MailDataRequired = {
        to: "takarojubilee@dajabe.nz",
        from: "takarojublee@dajabe.nz",
        subject: "New Jubilee Registration",
        html: generateAdminEmail(input.guests),
      };

      try {
        const newRegistration = await ctx.prisma.registrations.create({
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

        console.log({ newRegistration });

        const sendGuestEmail = await sendgrid.send(emailGuestData);
        console.log({ sendGuestEmail });

        const sendAdminEmail = await sendgrid.send(emailAdminData);
        console.log({ sendAdminEmail });

        return { message: "User registration successful!" };
      } catch (err) {
        console.error(err);
        return { error: "User registration failed" };
      }
    }),
});
