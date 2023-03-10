export interface ISubscriber {
    id: any; // eslint-disable-line
    name: string;
    email: string;
    created_at: string;
}

export interface ICreateSubscriber {
    name: string;
    email: string;
}

export interface IMail {
    subject: string;
    text: string;
    to: string;
    create_at: string;
}

export interface IIdentity {
    id: number;
    name: string;
    email: string;
    avatar: string;
}
