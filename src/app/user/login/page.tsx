"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center ">
      {/* Pre-built Clerk SignIn component */}
      <SignIn afterSignInUrl={"/"} signUpUrl="/user/register" />
    </main>
  );
}