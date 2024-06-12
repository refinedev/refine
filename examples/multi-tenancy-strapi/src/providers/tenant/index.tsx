import { dataProvider } from "@/providers/data";
import type { Store } from "@/types";
import { useParsed } from "@refinedev/core";
import { Spin } from "antd";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";

export type Tenant = Store;

type TenantContext = {
  tenant: Tenant;
  isLoading: boolean;
  tenants: Tenant[];
};

const TenantContext = createContext<TenantContext | undefined>(undefined);

export const TenantProvider = ({ children }: PropsWithChildren) => {
  const { params } = useParsed<{ tenantId: string }>();
  const tenantId = Number(params?.tenantId || 1);

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

  const currentTenant = useMemo(() => {
    const tenant = tenants.find((tenant) => tenant.id === tenantId);

    if (!tenant && tenants.length > 0) {
      return tenants[0];
    }

    return tenant;
  }, [tenantId, tenants]);

  const loading = isLoading || !currentTenant;

  return (
    <TenantContext.Provider
      value={{
        tenants,
        isLoading,
        // @ts-expect-error when tenant is not found, we are not rendering the children.
        // so it's safe to return undefined
        tenant: currentTenant,
      }}
    >
      {!loading ? (
        <Fragment key={currentTenant.id}>{children}</Fragment>
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
