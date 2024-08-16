import React from "react";

const Spinner: React.FC<{ size?: string; color?: string }> = ({
  size = "24px",
  color = "#ffffff",
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTop: `4px solid transparent`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default Spinner;
