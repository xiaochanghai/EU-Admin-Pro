import { createContext, useState } from "react";

interface RefreshContextType {
  outletShow: boolean;
  updateOutletShow: (val: boolean) => void;
}

export const RefreshContext = createContext<RefreshContextType>({
  outletShow: true,
  updateOutletShow: () => {}
});

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outletShow, setOutletShow] = useState(true);

  const updateOutletShow = (val: boolean) => {
    setOutletShow(val);
  };

  const contextValue = {
    outletShow,
    updateOutletShow
  };

  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>;
};
