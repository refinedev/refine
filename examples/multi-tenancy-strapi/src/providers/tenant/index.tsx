import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { dataProvider } from "@/providers/data";
import type { Store } from "@/types";

export type Tenant = Store;

type TenantContext = {
  tenant: Tenant;
  isLoading: boolean;
  tenants: Tenant[];
};

const TenantContext = createContext<TenantContext | undefined>(undefined);

export const TenantProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const tenantId = Number(location.pathname.split("/")[1] || 1);

  const [isLoading, setIsLoading] = useState(true);
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    setIsLoading(true);
    dataProvider
      .getList<Tenant>({
        resource: "stores",
        pagination: {
          mode: "off",
        },
        meta: {
          populate: ["image", "icon"],
        },
      })
      .then((response) => {
        setTenants(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loading = isLoading || tenants.length === 0;
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const shouldRenderChildren = isAuthPage ? true : !loading;

  return (
    <TenantContext.Provider
      value={{
        tenants,
        isLoading,
        // @ts-expect-error when tenant is not found, we are not rendering the children.
        // so it's safe to return undefined
        tenant: tenants.find((tenant) => tenant?.id === tenantId),
      }}
    >
      {shouldRenderChildren ? (
        children
      ) : (
        <div
          style={{
            height: "100dvh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin spinning size="large" />
        </div>
      )}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }

  return context;
};
