import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";

export type UploadResponse = UploadChangeParam<UploadFile<IMedia[]>>;

export interface IAccount {
  id: number;
  company_name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  logo?: IMedia;
  invoices?: IInvoice[];
  clients?: IClient[];
}

export interface IAccountForm {
  company_name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  logo?: UploadResponse;
}

export interface IClient {
  id: number;
  name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  invoices?: IInvoice[];
  account?: IAccount;
}

export interface IInvoice {
  id: number;
  name: string;
  date: string;
  discount: number;
  tax: number;
  custom_id: string;
  services: string;
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  account: IAccount;
  client: IClient;
}

export interface IService {
  title: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  totalPrice: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMedia {
  id: number;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}
