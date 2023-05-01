// import { z } from "zod";
import sendgrid, { type MailDataRequired } from "@sendgrid/mail";
import { timeStamp } from "console";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registrationInput } from "~/types";
import { generateAdminEmail, generateGuestEmail } from "~/utils/generateEmail";

if (process.env.SENDGRID_API_KEY)
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const adminEmail = process.env.ADMIN_EMAIL || "test@test.com";

export const registrationsRouter = createTRPCRouter({
  // This needs to be a protected proceedure
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.registrations.findMany();
  // }),

  create: publicProcedure
    .input(registrationInput)
    .mutation(async ({ ctx, input }) => {
      const emailGuestData: MailDataRequired = {
        to: input.email,
        from: adminEmail,
        subject: "Takaro 50th Jubilee Registration",
        html: generateGuestEmail(input.guests),
        mailSettings: {
          sandboxMode: { enable: true },
        },
      };

      const emailAdminData: MailDataRequired = {
        to: adminEmail,
        from: adminEmail,
        subject: "New Jubilee Registration",
        html: generateAdminEmail(input.guests),
        mailSettings: {
          sandboxMode: { enable: true },
        },
      };

      try {
        await ctx.prisma.$transaction(async (tx) => {
          const registration = await tx.registrations.create({
            data: {
              email: input.email,
              guestCount: input.guests.length,
              amount: input.amount,
              guests: {
                createMany: {
                  data: input.guests,
                },
              },
            },
          });

          const sendAdminEmail = await sendgrid.send(emailAdminData);
          if (!sendAdminEmail) {
            throw new Error("Sending admin email failed");
          }

          const sendGuestEmail = await sendgrid.send(emailGuestData);
          if (!sendGuestEmail) {
            throw new Error("Sending guest email failed");
          }

          await tx.registrations.update({
            where: {
              id: registration.id,
            },
            data: {
              emailSent: new Date(),
            },
          });

          return { message: "User registration successful!" };
        });
      } catch (err) {
        console.error(err);
        throw new Error("User registration failed");
      }
    }),
});
