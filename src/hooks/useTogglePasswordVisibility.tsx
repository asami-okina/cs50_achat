// libs
import React, { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordIconVisibility, setPasswordVisibility] =
    useState<boolean>(true);
  const [rightIcon, setRightIcon] = useState<string>("eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordIconVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordIconVisibility);
    }
  };

  return {
    passwordIconVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
