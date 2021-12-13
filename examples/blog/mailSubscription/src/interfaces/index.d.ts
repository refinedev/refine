export interface ISubscriber {
    id: any;
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
