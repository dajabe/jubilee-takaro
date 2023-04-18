import sendgrid, { type MailDataRequired } from "@sendgrid/mail";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registrationInput } from "~/types";

if (process.env.SENDGRID_API_KEY)
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sengridRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(registrationInput)
    .mutation(async ({ input }) => {
      // console.log({ input });
      const emailData: MailDataRequired = {
        to: "djb@dajabe.nz",
        from: "takarojubilee@dajabe.nz",
        subject: "Test Email",
        html: `<h1>You've got mail</h1>`,
      };
      try {
        const res = await sendgrid.send(emailData);
        console.log(res);
        return res;
      } catch (err) {
        return err;
      }
    }),
});
