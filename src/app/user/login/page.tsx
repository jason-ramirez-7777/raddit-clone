import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <SignIn />
    </main>
  );
}
