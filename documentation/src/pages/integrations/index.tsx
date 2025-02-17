import clsx from "clsx";
import React, { useMemo } from "react";

import IntegrationsLayout from "@site/src/components/integrations/layout";
import type { Integration } from "@site/src/types/integrations";
import { integrations as integrationsData } from "../../assets/integrations";
import Card from "../../components/integrations/card";

const Title = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={clsx(
        "font-semibold",
        "text-gray-700 dark:text-gray-200",
        "text-base sm:text-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

const List = ({ data }: { data: Integration[] }) => {
  return (
    <div
      className={clsx("grid", "grid-cols-1 lg:grid-cols-2", "gap-8", "mt-8")}
    >
      {data.map((item) => (
        <Card
          key={item.name}
          title={item.name}
          description={item.description}
          linkUrl={item.url}
          icon={item.icon}
          contributors={item.contributors}
        />
      ))}
    </div>
  );
};

const Integrations: React.FC = () => {
  const {
    communityPackages,
    dataProviderPackages,
    communityUiFrameworkPackages,
    communityDataProviderPackages,
    frameworks,
    integrations,
    liveProviders,
    uiPackages,
  } = useMemo(() => {
    return {
      uiPackages: integrationsData["ui-framework-packages"],
      dataProviderPackages: integrationsData["data-provider-packages"],
      communityUiFrameworkPackages:
        integrationsData["community-ui-framework-packages"],
      communityDataProviderPackages:
        integrationsData["community-data-provider-packages"],
      frameworks: integrationsData["frameworks"],
      integrations: integrationsData["integrations"],
      liveProviders: integrationsData["live-providers"],
      communityPackages: integrationsData["community-packages"],
    };
  }, []);

  return (
    <IntegrationsLayout>
      <div className={clsx("max-w-[624px]")}>
        <div
          className={clsx(
            "font-semibold",
            "text-gray-700 dark:text-gray-200",
            "text-xl sm:text-[40px] sm:leading-[56px]",
          )}
        >
          Seamless integration with your existing ecosystem.
        </div>
        <div
          className={clsx(
            "font-semibold",
            "text-gray-700 dark:text-gray-300",
            "text-xs sm:text-base",
            "mt-4 sm:mt-8",
          )}
        >
          List of packages to extend your Refine project with UI frameworks,
          backend connectors and other powerful tools.
        </div>
      </div>

      <div
        className={clsx(
          "my-10",
          "border-b border-gray-200 dark:border-gray-700",
        )}
      />

      <Title>UI Framework Packages</Title>
      <List data={uiPackages} />

      <Title className="mt-20">Data Provider Packages</Title>
      <List data={dataProviderPackages} />

      <Title className="mt-20">UI Framework Packages by the Community ❤️</Title>
      <List data={communityUiFrameworkPackages} />

      <Title className="mt-20">Data Provider Packages by the Community ❤️</Title>
      <List data={communityDataProviderPackages} />

      <Title className="mt-20">Frameworks</Title>
      <List data={frameworks} />

      <Title className="mt-20">Integrations</Title>
      <List data={integrations} />

      <Title className="mt-20">Live Providers</Title>
      <List data={liveProviders} />

      <Title className="mt-20">Community Packages</Title>
      <List data={communityPackages} />
    </IntegrationsLayout>
  );
};

export default Integrations;
