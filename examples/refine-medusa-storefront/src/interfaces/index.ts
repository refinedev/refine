import Product from "@medusajs/medusa-js";
export interface CardFields {
    cardHolder: string;
    cardNumber: string;
    cardExpireDate: string;
    cardCvc: string;
    firstName: string;
    lastName: string;
    company: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface AddressFields {
    type: string;
    firstName: string;
    lastName: string;
    company: string;
    streetNumber: string;
    apartments: string;
    zipCode: string;
    city: string;
    country: string;
}

export type MedusaStoreProductRes = Awaited<
    ReturnType<Product["products"]["retrieve"]>
>;

export type MedusaProduct = MedusaStoreProductRes["product"];
