"use client";

import { useState } from "react";
import Toggle from "../Icons/Toggle";
import ToggleActive from "../Icons/ToggleActive";
import Typography from "../Typography";

const Switch = ({ className, label, description, defaultActive = false }) => {
  const [isActive, setIsActive] = useState(defaultActive);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`flex items-center gap-2 cursor-pointer select-none ${className}`} onClick={handleToggle}>
      {isActive ? <ToggleActive /> : <Toggle />}
      <div>
        <Typography size="h5">{label}</Typography>
        {description && <Typography size="body2">{description}</Typography>}
      </div>
    </div>
  );
};

export default Switch;
