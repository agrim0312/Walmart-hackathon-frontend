import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin text-white rounded-full border-t-transparent",
        sizeClasses[size]
      )}
    />
  );
};

export default Spinner;
