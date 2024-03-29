import { NextResponse } from "next/server";
import cors from "cors";
export { default } from "next-auth/middleware";

// List of allowed origins
// const allowedOrigins = ["https://world-recipes-made-yours.vercel.app/"];

export function middleware(request: Request) {
  // if (process.env.NODE_ENV === "production") {
  //   // console.log("Request Method: ", request.method);
  //   // console.log("Request URL: ", request.url);
  //   // console.log("Request Headers: ", request.headers);
  //   // console.log("Request Origin", request.headers.get("Origin"));

  //   const res = NextResponse.next();
  //   const origin = request.headers.get("Origin");
  //   if (origin && allowedOrigins.includes(origin)) {
  //     res.headers.append("Access-Control-Allow-Origin", origin);
  //   }
  //   res.headers.append("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  //   res.headers.append(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization"
  //   );
  //   if (request.method === "OPTIONS") {
  //     return new NextResponse(null, { status: 200 });
  //   }
  //   return res;
  // }
}

export const config = {
  matcher: ["/profile", "/members", "/admin/:path*", "/api/chat/:path*" , "/api/recipes/:path*", "/api/auth/:path*"],
};
