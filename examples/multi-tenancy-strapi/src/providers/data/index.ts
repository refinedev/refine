import { DataProvider } from "@refinedev/strapi-v4";
import { API_URL } from "@/constants";
import { axiosInstance } from "@/lib/axios";

export const dataProvider = DataProvider(`${API_URL}/api`, axiosInstance);
