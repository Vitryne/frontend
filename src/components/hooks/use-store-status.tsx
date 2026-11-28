import { createContext, useContext, useState } from "react";

interface StoreStatus {
  storeOpen: boolean;
  setStoreOpen: (open: boolean) => void;
}

const StoreStatusContext = createContext<StoreStatus | null>(null);

interface Props {
  children: React.ReactNode;
}

export const StoreStatusProvider: React.FC<Props> = ({ children }) => {
  const [storeOpen, setStoreOpen] = useState(true);

  return (
    <StoreStatusContext.Provider value={{ storeOpen, setStoreOpen }}>
      {children}
    </StoreStatusContext.Provider>
  );
};

export const useStoreStatus = () => {
  const context = useContext(StoreStatusContext);

  if (!context) {
    throw new Error(
      "useStoreStatus precisa estar dentro do StoreStatusProvider",
    );
  }

  return context;
};
