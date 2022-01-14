export interface IStore {
    id: string;
    title: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: any;
    stores: {
        data: {
            id: string;
            attributes: IStore;
        };
    };
}

export interface IOrder {
    id: string;
    title: string;
    status: "delivered" | "not delivered";
    quantitiy: number;
    customerName: string;
    product: any;
    customerAddress: string;
    stores: {
        data: {
            id: string;
            attributes: IStore;
        };
    };
}
