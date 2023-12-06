"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocalStorageData } from "./helpers/globalFunction";
import { useEffect } from "react";
import nookies from "nookies";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, ctx: any) {
  // const lngData = getLocalStorageData("lan");

  const cookies = nookies.get(ctx);

  nookies.set(ctx, "isPassword", "value", {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  console.log("cookies", ctx);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/global-setting?populate=deep&locale=en`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "*",
      },
    }
  );
  const data = await res.json();

  const passwordData = data?.data?.attributes?.Password;

  if (passwordData?.isPassword == true) {
    return NextResponse.redirect(new URL("/password", request.url));
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/about/:path*",
  matcher: "/",
};
