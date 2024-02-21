import React from "react";

export interface IconProps {
  color?: string;
}

export interface NavbarConfig {
  id: number;
  icon: (props: IconProps) => React.JSX.Element;
  name: string;
  path: string;
}