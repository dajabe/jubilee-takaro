interface Guest {
  firstName: string;
  lastName: string;
}

export function generateGuestEmail(guests: Guest[]): string {
  const contentStart = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>You are registered for Takaro's 50th Jubilee celebration</title>
		</head>
		<body>
		<h1>Thank you ${guests[0]?.firstName || ""} for registering</h1>
		<p>You have registered the following people to come to Takaro's 50th Jubilee celebration</p>
		<ul>`;
  const contentEnd = `</ul></body></html>`;
  let content = "<div>";
  guests.forEach((guest) => {
    content = content + `<li>${guest.firstName} ${guest.lastName}</li>`;
  });
  return contentStart + content + contentEnd;
}

export function generateAdminEmail(guests: Guest[]): string {
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
