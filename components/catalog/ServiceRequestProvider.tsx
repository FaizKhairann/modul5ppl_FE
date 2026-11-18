"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

interface ServiceRequestPrefill {
  serviceId?: string;
  title?: string;
}

interface ServiceRequestContextValue {
  isOpen: boolean;
  prefill: ServiceRequestPrefill | null;
  openRequest: (prefill?: ServiceRequestPrefill) => void;
  closeRequest: () => void;
}

const ServiceRequestContext = createContext<ServiceRequestContextValue | null>(null);

interface ServiceRequestProviderProps {
  children: ReactNode;
}

export function ServiceRequestProvider({
  children,
}: ServiceRequestProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<ServiceRequestPrefill | null>(null);

  function openRequest(nextPrefill?: ServiceRequestPrefill) {
    setPrefill(nextPrefill ?? null);
    setIsOpen(true);
  }

  function closeRequest() {
    setIsOpen(false);
    setPrefill(null);
  }

  return (
    <ServiceRequestContext.Provider
      value={{ isOpen, prefill, openRequest, closeRequest }}
    >
      {children}
    </ServiceRequestContext.Provider>
  );
}

export function useServiceRequest() {
  const context = useContext(ServiceRequestContext);

  if (!context) {
    throw new Error("useServiceRequest must be used within ServiceRequestProvider");
  }

  return context;
}
