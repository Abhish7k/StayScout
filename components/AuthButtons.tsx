"use client";

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";

export function RegisterButton() {
  return <RegisterLink className="w-full">Register</RegisterLink>;
}

export function LoginButton() {
  return <LoginLink className="w-full">Login</LoginLink>;
}

export function LogoutButton() {
  return <LogoutLink className="w-full">Logout</LogoutLink>;
}
