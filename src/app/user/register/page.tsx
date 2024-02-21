"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SignUp, useClerk, useSignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  const { isLoaded, signUp } = useSignUp();

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
      {/* <div className=" flex w-[397px] flex-col">
        <h1 className=" text-[28px] font-medium leading-10 mb-1">
          Join the best community ever
        </h1>

        <h2 className="text-[20px] font-normal leading-8 text-[#4B5563] ">
          Create an account today
        </h2>

        <Button
          className="flex justify-start rounded-xl border border-[#D1D5DB] p-5 my-7 h-12"
          variant="outline"
        >
          <Image
            alt="google chrome svg"
            src="/assets/google-svgrepo-com.svg"
            className="mr-3"
            width={26}
            height={26}
          />

          <div className="text-base font-normal leading-4 text-[#374151]">
            Continue with Google
          </div>
        </Button>

        <div className="flex items-center">
          <div className=" text-base leading-6 text-[#374151]">
            Already have an account?
          </div>

          <Link
            href={"/user/login"}
            className="ml-1 p-0 text-base font-medium leading-4 text-[#172554] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div> */}
    </main>
  );
}
