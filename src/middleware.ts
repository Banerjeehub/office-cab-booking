import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("tokenOne")?.value || "";
  const accountType = request.cookies.get("accountType")?.value || "";

  if (isPublic && token && accountType !== "Driver") {
    return NextResponse.redirect(new URL("/booking", request.nextUrl));
  }
  if (isPublic && token && accountType === "Driver") {
    return NextResponse.redirect(
      new URL("/dashboard/emailId", request.nextUrl)
    );
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/booking/:paths*", "/", "/login/:paths*", "/signup/:paths*"],
};
