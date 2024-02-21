import React from "react";
import { IconProps } from "@/lib/interface";

const UpvoteIcon = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33325 11.6667L9.99992 5L16.6666 11.6667M6.66659 14.1665L9.99992 10.8332L13.3333 14.1665" stroke={props.color ? props.color : "#4F46E5"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default UpvoteIcon;