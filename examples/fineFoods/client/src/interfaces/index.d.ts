export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
    cover?: string;
}

export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: IFile[];
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
}

export interface IAddress {
    text: string;
    coordinate: [string, string];
}
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
    addresses: IAddress[];
}

export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IStore {
    id: number;
    title: string;
    isActive: boolean;
    createdAt: string;
    address: IAddress;
    products: IProduct[];
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
}

export interface IEvent {
    date: string;
    status: string;
}

export interface IOrder {
    id: number;
    user: IUser;
    createdAt: string;
    products: IProduct[];
    status: IOrderStatus;
    adress: IAddress;
    store: IStore;
    courier: ICourier;
    events: IEvent[];
    orderNumber: number;
    amount: number;
}

export interface IBasketOrder {
    productId: number;
    amount: number;
}
