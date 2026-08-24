"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactModal } from "@/components/contact-modal";

interface ContactModalContextType {
  isOpen: boolean;
  defaultService: string;
  openContactModal: (service?: string) => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState("");

  const openContactModal = (service?: string) => {
    setDefaultService(service || "");
    setIsOpen(true);
  };

  const closeContactModal = () => {
    setIsOpen(false);
  };

  return (
    <ContactModalContext.Provider
      value={{ isOpen, defaultService, openContactModal, closeContactModal }}
    >
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={closeContactModal}
        initialService={defaultService}
      />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider"
    );
  }
  return context;
}
