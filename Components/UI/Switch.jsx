"use client";

import Toggle from "@/Components/Icons/Toggle";
import ToggleActive from "@/Components/Icons/ToggleActive";
import { useState } from "react";

const Switch = ({ isActive: controlledActive, onToggle, children, className = "" }) => {
  const [uncontrolledActive, setUncontrolledActive] = useState(false);
  const isControlled = typeof controlledActive !== "undefined";
  const active = isControlled ? controlledActive : uncontrolledActive;

  const handleToggle = () => {
    if (!isControlled) {
      setUncontrolledActive(!uncontrolledActive);
    }
    if (onToggle) {
      onToggle(!active);
    }
  };

  return (
    <div className={`flex items-center gap-2 cursor-pointer select-none ${className}`} onClick={handleToggle}>
      {active ? <ToggleActive /> : <Toggle />}
      <div>{children}</div>
    </div>
  );
};

export default Switch;
