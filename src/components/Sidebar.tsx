"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { UserButton, useClerk } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import HomeIcon from "@/components/icons/HomeIcon";
import LoginIcon from "@/components/icons/LoginIcon";
import PostIcon from "@/components/icons/PostIcon";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useClerk();

  return (
    <div className="flex flex-col justify-between fixed top-0 left-0 w-80 h-full p-4 bg-white">
      <div className="flex flex-col">
        <Link href={"/"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
          <HomeIcon color="black" />
          <p className="ml-3">Home</p>
        </Link>

        {
          user ? (
            <Link href={"/my-posts"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/my-posts" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
              <PostIcon color="black" />
              <p className="ml-3">My posts</p>
            </Link>
          ) : (
            <Link href={"/user/login"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/user/login" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
              <LoginIcon color="black" />
              <p className="ml-3">Log In</p>
            </Link>
          )
        }
      </div>

      {
        user && (
          <div className="flex items-center p-2">
            <UserButton afterSignOutUrl="/" />
            <h1 className="ml-3">{user.firstName} {user.lastName}</h1>
          </div>
        )
      }

      <Separator orientation="vertical" className="absolute top-0 right-0 h-screen" />
    </div>
  );
};

export default Sidebar;