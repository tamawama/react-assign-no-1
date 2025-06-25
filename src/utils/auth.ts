import { redirect } from "react-router-dom";

export function hasValidToken(): boolean {
  // since token is an http only cookie, we shouldn't be able to write to it if we have it
  document.cookie = "token=invalid; SameSite=None; Secure";
  const tokenIndex = document.cookie.indexOf("token=");
  return tokenIndex === -1;
}

export function authProtection(): void {
  if (!hasValidToken()) {
    redirect("/auth");
  }
}
