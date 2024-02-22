"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp afterSignUpUrl={"/user/login"} signInUrl="/user/login" />
    </main>
  );
}
