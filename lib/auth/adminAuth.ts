import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken, SESSION_COOKIE_NAME, type AdminSessionPayload } from "./session";

/**
 * Auth is accessed through this interface so the underlying implementation
 * (currently: env-var credentials + a signed cookie) can be swapped for
 * NextAuth/Auth.js or a full JWT/identity provider later without touching
 * any calling code — every admin page/route only ever calls `login`,
 * `logout`, or `getAdminSession` from this file.
 */
export interface AdminAuthService {
  login(email: string, password: string): Promise<{ success: boolean; message?: string }>;
  logout(): Promise<void>;
  getSession(): Promise<AdminSessionPayload | null>;
}

class EnvAdminAuthService implements AdminAuthService {
  async login(email: string, password: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return { success: false, message: "Admin credentials are not configured on the server." };
    }

    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
      return { success: false, message: "Invalid email or password." };
    }

    const token = await createSessionToken(adminEmail);
    cookies().set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return { success: true };
  }

  async logout() {
    cookies().delete(SESSION_COOKIE_NAME);
  }

  async getSession() {
    const token = cookies().get(SESSION_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  }
}

// -----------------------------------------------------------------------
// Example of how this would be swapped for NextAuth/Auth.js later:
//
// export class NextAuthAdminAuthService implements AdminAuthService {
//   async login(email, password) { /* delegate to signIn() */ }
//   async logout() { /* delegate to signOut() */ }
//   async getSession() { /* delegate to auth() / getServerSession() */ }
// }
// -----------------------------------------------------------------------

export const adminAuth: AdminAuthService = new EnvAdminAuthService();
