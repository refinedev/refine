import React from "react";
import { DataProvider, DataProviders, IDataContext } from "./types";

export const defaultDataProvider: DataProviders = {
  default: {} as DataProvider,
};

export const DataContext =
  React.createContext<IDataContext>(defaultDataProvider);

type Props = React.PropsWithChildren<{
  dataProvider?: DataProvider | DataProviders;
}>;

export const DataContextProvider: React.FC<Props> = ({
  children,
  dataProvider,
}) => {
  let providerValue = defaultDataProvider;

  if (dataProvider) {
    if ("default" in dataProvider) {
      providerValue = dataProvider;
    } else {
      providerValue = {
        default: dataProvider,
      };
    }
  }

  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};
