import React from "react";
import { ReactNode } from "react";

import {
  IDataContextProvider,
  IDataMultipleContextProvider,
} from "../../interfaces";

export const defaultDataProvider = () => {
  return {};
};

export const DataContext = React.createContext<
  Partial<IDataMultipleContextProvider>
>(defaultDataProvider());

type Props = React.PropsWithChildren<
  Partial<IDataMultipleContextProvider> | IDataContextProvider
>;

export const DataContextProvider: React.FC<Props> = ({ children, ...rest }) => {
  let dataProviders;
  if (!rest.getList || !rest.getOne) {
    dataProviders = rest as IDataMultipleContextProvider;
  } else {
    dataProviders = {
      default: rest,
    } as IDataMultipleContextProvider;
  }
  return (
    <DataContext.Provider value={dataProviders}>
      {children}
    </DataContext.Provider>
  );
};
