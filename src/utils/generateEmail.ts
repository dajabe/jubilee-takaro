import { type GuestSchema } from "~/types";
import { ticketPrices } from "./generics";

export function generateGuestEmail(
  guests: GuestSchema,
  amount: number
): string {
  const contentStart = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Takaro's 50th jubilee registration</title>
		</head>
		<body>
			<h1>Hi ${guests[0]?.firstName || ""}</h1>
			<p>Thank you for registering to come to celebrate 50 years of football with Takaro AFC.</p>
			<p>You will recieve an invoice shortly with payment details for you and your guest's tickets.
			Your registration is not complete until this invoice has been paid.</p>
			<p>You have registered the following guests</p>
		<table>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Ticket</th>
				<th>Amount</th>
			</tr>`;
  let content = "<div>";
  guests.forEach((guest) => {
    const ticketAmount = ticketPrices[guest.ticketType] || 0;
    content =
      content +
      `<tr>
				<td>${guest.firstName}</td>
				<td>${guest.lastName}</td>
				<td>${guest.ticketType}</td>
				<td>${ticketAmount}</td>
			</tr>`;
  });
  const contentEnd = `<td>Total</td><td></td><td></td><td>${amount}</td></table></body></html>`;
  return contentStart + content + contentEnd;
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
