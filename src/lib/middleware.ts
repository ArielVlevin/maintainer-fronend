import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const url = req.nextUrl.clone();

  if (!token) {
    // אם אין טוקן, שלח להתחברות
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (!token.name || !token.email) {
    // אם הפרופיל לא הושלם, שלח לעמוד השלמת פרטים
    url.pathname = "/complete-profile";
    return NextResponse.redirect(url);
  }

  // ברירת מחדל: אפשר גישה
  return NextResponse.next();
}

// ✅ הגנה על עמודים רגישים
export const config = {
  matcher: ["/dashboard", "/profile", "/settings"],
};
