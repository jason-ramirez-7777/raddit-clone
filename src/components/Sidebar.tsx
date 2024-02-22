"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { UserButton, useClerk } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import HomeIcon from "@/components/icons/HomeIcon";
import LoginIcon from "@/components/icons/LoginIcon";
import PostIcon from "@/components/icons/PostIcon";
import { Button } from "@/components/ui/button";
import { RowsIcon } from "@radix-ui/react-icons";
import BackIcon from "./icons/BackIcon";

const Sidebar = () => {
  const pathname = usePathname(); // Using the usePathname hook to get the current pathname
  const { user } = useClerk(); // Destructuring user object from the useClerk hook
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Using React.useState to manage the state of sidebar visibility

  // Function to toggle the sidebar open/close state
  const toggleSidebarOpen = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <React.Fragment>
      {/* Button to toggle the sidebar visibility */}
      <Button className="fixed lg:hidden top-4 left-4 w-12 h-12 rounded-full text-white" onClick={toggleSidebarOpen}>
        <RowsIcon />
      </Button>

      <div className={`flex flex-col justify-between fixed top-0 ${isSidebarOpen ? "left-0" : "-left-full"} lg:left-0 w-64 xl:w-80 h-full p-4 bg-white transition-all duration-300 z-10`}>
        <div className="flex flex-col">
          {/* Button to close the sidebar on smaller screens */}
          <button className="block lg:hidden p-2 pb-4" onClick={toggleSidebarOpen}>
            <BackIcon />
          </button>

          {/* Link to the home page */}
          <Link href={"/"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
            <HomeIcon color="black" />
            <p className="ml-3">Home</p>
          </Link>

          {/* Conditional rendering of links based on user authentication */}
          {user ? (
            // Link to "My Posts" page if user is authenticated
            <Link href={"/my-posts"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/my-posts" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
              <PostIcon color="black" />
              <p className="ml-3">My posts</p>
            </Link>
          ) : (
            // Link to login page if user is not authenticated
            <Link href={"/user/login"} className={`flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary [&_path]:hover:stroke-primary ${pathname === "/user/login" && "bg-secondary text-primary [&_path]:stroke-primary"}`}>
              <LoginIcon color="black" />
              <p className="ml-3">Log In</p>
            </Link>
          )}

        </div>

        {/* Render user information and sign out button if user is authenticated */}
        {user && (
          <div className="flex items-center p-2">
            <UserButton afterSignOutUrl="/" />
            <h1 className="ml-3">{user.firstName} {user.lastName}</h1>
          </div>
        )}

        <Separator orientation="vertical" className="absolute top-0 right-0 h-screen" />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
