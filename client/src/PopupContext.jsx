import React, { createContext, useContext, useState } from "react";

// Create the context
const PopupContext = createContext();

// Create a provider component
export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Ransomware Detected!");

  // Function to show the popup
  const triggerPopup = (alertMessage) => {
    setMessage(alertMessage || "Ransomware Detected!");
    setIsOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, message, triggerPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
