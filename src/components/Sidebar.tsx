import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navbarConfig } from "@/lib/config";
import { NavbarConfig } from "@/lib/interface";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between w-80 p-4 bg-white">
      <div className="flex flex-col">
        {
          navbarConfig.map((item: NavbarConfig) => (
            <a key={item.id} href={item.path} className="flex items-center w-full p-3 my-0.5 rounded-xl transition-all duration-300 hover:bg-secondary [&>p]:hover:text-primary">
              {React.createElement(item.icon)}
              <p className="ml-3 transition-all duration-300">{item.name}</p>
            </a>
          ))
        }
      </div>

      <div className="flex items-center p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>

        <h1 className="ml-3">Christin Cook</h1>
      </div>
    </div>
  );
};

export default Sidebar;