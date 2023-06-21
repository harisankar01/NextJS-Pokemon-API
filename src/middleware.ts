import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtVerify } from 'jose';
const secretKey: string = process.env.TOKEN as string;

export async function middleware(request: NextRequest) {
  let url = request.nextUrl
  const token = url.searchParams.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secretKey));
     url.searchParams.delete("token")
     return NextResponse.rewrite(url)
  } catch (error) {
    console.log('Access token verification failed:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: '/info',
};
