import React from "react";
import { IconProps } from "@/lib/interface";

const HomeIcon = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3333 5.83333L9.99992 9.16666L6.66659 5.83333M3.33325 8.33333L9.99992 15L16.6666 8.33333" stroke={props.color ? props.color : "#4F46E5"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default HomeIcon;