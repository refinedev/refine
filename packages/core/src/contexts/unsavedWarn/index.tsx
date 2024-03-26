import React, { useState, PropsWithChildren } from "react";

import { IUnsavedWarnContext } from "./types";

export const UnsavedWarnContext = React.createContext<IUnsavedWarnContext>({});

export const UnsavedWarnContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [warnWhen, setWarnWhen] = useState(false);

  return (
    <UnsavedWarnContext.Provider value={{ warnWhen, setWarnWhen }}>
      {children}
    </UnsavedWarnContext.Provider>
  );
};
