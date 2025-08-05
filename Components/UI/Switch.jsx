"use client";

import Toggle from "@/Components/Icons/Toggle";
import ToggleActive from "@/Components/Icons/ToggleActive";
import { useState } from "react";

const Switch = ({ isActive: controlledActive, onToggle, children, className = "", disabled = false }) => {
  const [uncontrolledActive, setUncontrolledActive] = useState(false);
  const isControlled = typeof controlledActive !== "undefined";
  const active = isControlled ? controlledActive : uncontrolledActive;

  const handleToggle = () => {
    if (disabled) return;

    if (!isControlled) {
      setUncontrolledActive(!uncontrolledActive);
    }

    if (onToggle) {
      onToggle(!active);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 select-none ${!disabled ? "cursor-pointer" : "cursor-default"} ${className}`}
      onClick={handleToggle}
    >
      <div className={disabled ? "opacity-10" : ""}>{active ? <ToggleActive /> : <Toggle />}</div>
      <div>{children}</div>
    </div>
  );
};

export default Switch;
