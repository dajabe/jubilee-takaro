import { type GuestSchema } from "~/types";
import { ticketPrices } from "./generics";
import { html } from "code-tag";

function createGuestTable(guests: GuestSchema): string {
  return guests.reduce((acc, guest) => {
    const ticketAmount = ticketPrices[guest.ticketType] || 0;
    return (
      acc +
      html`<tr>
        <td>${guest.firstName}</td>
        <td>${guest.lastName}</td>
        <td style="text-align: right;">${guest.ticketType}</td>
        <td style="text-align: right;">$ ${ticketAmount.toString()}</td>
      </tr>`
    );
  }, "");
}

export function generateGuestEmail(
  guests: GuestSchema,
  amount: number
): string {
  const guestTable = createGuestTable(guests);

  const content = html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Takaro's 50th jubilee registration</title>
      </head>
      <body>
        <h3>Hi ${guests[0]?.firstName || ""}</h3>
        <p>
          Thank you for your registration to attend the celebration of 50 years of football
          with Takaro AFC.
        </p>
        <p>
          <b>IMPORTANT!!!</b> Registration needs to be paid by the 24th of May.
        </p>
        <p>
          You will recieve an invoice shortly with payment details for you and
          your guests attendance. Your registration is not complete until the invoice is 
          paid in full by 24th of May to confirm your registration
        </p>
        <p>You have registered the following guests</p>
        <table style="border-spacing: 10px;">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Ticket</th>
            <th>Amount</th>
          </tr>
          ${guestTable}
          <tr style="border-top: 2px solid black;">
            <td></td>
            <td></td>
            <td style="text-align: right;">Total:</td>
            <td style="text-align: right;">$ ${amount.toString()}</td>
          </tr>
        </table>
      </body>
    </html>`;

  return content;
}

export function generateAdminEmail(
  guests: GuestSchema,
  amount: number
): string {
  const guestTable = createGuestTable(guests);

  const content = html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Jubilee registration: ${guests[0]?.firstName || ""}
          ${guests[0]?.firstName || ""}
        </title>
      </head>
      <body>
        <h3>New registration for the following guests</h3>
        <table style="border-spacing: 10px;">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Ticket</th>
            <th>Amount</th>
          </tr>
          ${guestTable}
          <tr style="border-top: 2px solid black;">
            <td></td>
            <td></td>
            <td style="font-weight: bold; text-align: right;">Total:</td>
            <td style="text-align: right;">$ ${amount.toString()}</td>
          </tr>
        </table>
      </body>
    </html>`;

  return content;
}
