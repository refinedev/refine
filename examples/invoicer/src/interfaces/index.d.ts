export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface IAccounts {
  id: number;
  title: string;
  avatar: string;
  name: string;
  email: string;
  income: number;
  phone: string;
}

export type IUser = {
  id: number;
  name: string;
  avatar: string;
};
