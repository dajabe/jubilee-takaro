import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { type NextApiRequest, type NextApiResponse } from "next";

// export default withClerkMiddleware((req: NextRequest) => {
//   return NextResponse.next();
// });
const publicPaths = ["/", "/sign-in*", "/sign-up*"];

const isPublic = (path: string) => {
  return publicPaths.some((x) => {
    console.log({ path, x });
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")));
  });
};

export default withClerkMiddleware((req) => {
  console.log(req.nextUrl.pathname);
  // return NextResponse.next();
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  const { userId } = getAuth(req);

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_to", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico|favicon.png).*)",
    "/",
  ],
};
