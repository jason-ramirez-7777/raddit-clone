import React from "react";
import { IconProps } from "@/lib/interface";

const HomeIcon = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33333 4.16666L2.5 9.99993M2.5 9.99993L8.33333 15.8333M2.5 9.99993H17.5" stroke={props.color ? props.color : "#4F46E5"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default HomeIcon;