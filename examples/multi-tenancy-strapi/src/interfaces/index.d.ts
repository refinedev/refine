export interface IStore {
    id: string;
    title: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: any; // eslint-disable-line
    stores: IStore;
}

export interface IOrder {
    id: string;
    title: string;
    status: "delivered" | "not delivered";
    quantitiy: number;
    customerName: string;
    product: IProduct;
    customerAddress: string;
    stores: IStore;
}

export interface IOrderForm {
    title: string;
    status: "delivered" | "not delivered";
    quantitiy: number;
    customerName: string;
    products?: number[];
    customerAddress: string;
    stores?: [string];
}
