import { API_URL } from "@/constants";
import { axiosInstance } from "@/lib/axios";
import { DataProvider } from "@refinedev/strapi-v4";

export const dataProvider = DataProvider(`${API_URL}/api`, axiosInstance);
