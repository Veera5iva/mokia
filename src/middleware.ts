import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

  //  const path = request.nextUrl.pathname;

  //  const isPublicPath = path === '/consumer/login' || path === '/consumer/signup' || path === '/verifyemail'

  //  const token = request.cookies.get("token")?.value || ""

  // //  if(isPublicPath && token) return NextResponse.redirect(new URL("/consumer/profile", request.nextUrl));
  // //  if(!isPublicPath && !token) return NextResponse.redirect(new URL("/consumer/login", request.nextUrl));

}
 
export const config = {
  matcher: [
   "/",
   "/profile",
   "/login",
   "/signup",
   "/verifyemail",
  ],
}