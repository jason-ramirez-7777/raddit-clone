import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <SignUp />
    </main>
  );
}
