import { type GuestSchema } from "~/types";
import { ticketPrices } from "./generics";
import { html } from "code-tag";

export function generateGuestEmail(
  guests: GuestSchema,
  amount: number
): string {
  const guestTable = guests.reduce((acc, guest) => {
    const ticketAmount = ticketPrices[guest.ticketType] || 0;
    return (
      acc +
      html`<tr>
        <td>${guest.firstName}</td>
        <td>${guest.lastName}</td>
        <td>${guest.ticketType}</td>
        <td>$ ${ticketAmount.toString()}</td>
      </tr>`
    );
  }, "");
  /* HTML */
  const content = html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Takaro's 50th jubilee registration</title>
      </head>
      <body>
        <h1>Hi ${guests[0]?.firstName || ""}</h1>
        <p>
          Thank you for registering to come to celebrate 50 years of football
          with Takaro AFC.
        </p>
        <p>
          You will recieve an invoice shortly with payment details for you and
          your guest's tickets. Your registration is not complete until this
          invoice has been paid.
        </p>
        <p>You have registered the following guests</p>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Ticket</th>
            <th>Amount</th>
            ${guestTable}
          </tr>
          <tr></tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>$ ${amount.toString()}</td>
          </tr>
        </table>
      </body>
    </html>`;
  return content;
}

export function generateAdminEmail(guests: GuestSchema): string {
  const contentStart = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>New registration for Takaro's 50th Jubilee celebration</title>
		</head>
		<body>
		<h1>${guests[0]?.firstName || ""} ${
    guests[0]?.lastName || ""
  } just registered</h1>
		<p>The following people have been registered to attend:</p>
		<ul>`;
  const contentEnd = `</ul></body></html>`;
  let content = "<div>";
  guests.forEach((guest) => {
    content = content + `<li>${guest.firstName} ${guest.lastName}</li>`;
  });
  return contentStart + content + contentEnd;
}
