import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!token) return null;

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return (decoded?.accessToken as string) || null;
}