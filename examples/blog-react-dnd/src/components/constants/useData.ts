import React from "react";
import { ColumnTypes } from "./enums";
import type { IProduct } from "components/constants/models";
import { useList } from "@refinedev/core";

function useData() {
  //Fetching data from the products endpoint
  //using refine's useList hook

  const { data } = useList<IProduct>({
    config: {
      pagination: {
        current: 2,
      },
    },
    resource: "products",
  });

  //modifying fecthed data and adding column property

  const newArr = data?.data.map((i: IProduct) => {
    return {
      ...i,
      column: ColumnTypes.ORDERS,
    };
  });

  return [newArr, data?.data];
}

export default useData;
