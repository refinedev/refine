import type { UploadFile } from "antd";
import type { UploadChangeParam } from "antd/lib/upload";

export type UploadResponse = UploadChangeParam<UploadFile<Media[]>>;

export type Store = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  primaryColor: string;
  image: Media;
  icon: Media;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  price: number;
  status: "AVAILABLE" | "UNAVAILABLE";
  image: Media;
};

export type ProductForm = {
  title: string;
  description: string;
  price: number;
  category: number;
  store: number;
  image: UploadResponse;
  status: "AVAILABLE" | "UNAVAILABLE";
};

export type Category = {
  id: number;
  title: string;
  status: "VISIBLE" | "INVISIBLE";
};

export type Order = {
  id: string;
  title: string;
  status: "CANCELLED" | "IN_DELIVERY" | "DELIVERED" | "READY";
  quantitiy: number;
  order_date: string;
  delivery_date: string;
};

export type Customer = {
  name: string;
  address: string;
  phone: string;
  status: "ACTIVE" | "IDLE";
  createdAt: string;
};

export type Media = {
  id: number;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats?: {
    large: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: any;
      size: number;
      width: number;
      height: number;
    };
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: any;
      size: number;
      width: number;
      height: number;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: any;
      size: number;
      width: number;
      height: number;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: any;
      size: number;
      width: number;
      height: number;
    };
  };
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
};
