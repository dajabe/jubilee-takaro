import { withClerkMiddleware } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { type NextApiRequest, type NextApiResponse } from "next";

// export default withClerkMiddleware((req: NextRequest) => {
//   return NextResponse.next();
// });
const publicPaths = ["/", "/sign-in*", "/sign-up*"];

const isPublic = (path: string) => {
  return publicPaths.some((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default authMiddleware((req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { userId } = getAuth(req);

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_to", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextRequest.next();
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
