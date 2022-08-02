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
    ReturnType<Medusa["products"]["retrieve"]>
>;

export type MedusaProduct = MedusaStoreProductRes["product"];

export type MedusaStoreCollectionRes = Awaited<
    ReturnType<Medusa["collections"]["retrieve"]>
>;

export type MedusaStorePaymentSessionRes = Awaited<ReturnType<Medusa>>;

export type MedusaCollection = MedusaStoreCollectionRes["collection"];
