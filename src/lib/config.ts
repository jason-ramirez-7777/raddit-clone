import HomeIcon from "@/components/icons/HomeIcon";
import PostIcon from "@/components/icons/PostIcon";
import { NavbarConfig } from "./interface";

export const navbarConfig: NavbarConfig[] = [
  {
    id: 1,
    icon: HomeIcon,
    name: "Home",
    path: "/"
  },
  {
    id: 2,
    icon: PostIcon,
    name: "My posts",
    path: "/my-posts"
  },
];