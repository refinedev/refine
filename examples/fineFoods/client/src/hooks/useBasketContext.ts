import { useContext } from "react";

import { BasketContext } from "@contextProviders";

export const useBasketContext = () => {
    const basket = useContext(BasketContext);
    return basket;
};
