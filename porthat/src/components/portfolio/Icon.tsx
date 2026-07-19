import React from "react";
import { SVGS } from "../../lib/constants";


interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, className = "w-4 h-4", style }: IconProps) {
  const svg = SVGS[name as keyof typeof SVGS];
  if (!svg) return null;
  return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: svg }} />;
}
