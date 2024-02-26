import React from "react";
import Head from "@docusaurus/Head";
import clsx from "clsx";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";

const IntegrationsLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <CommonLayout>
      <Head title="Integrations | Refine">
        <html data-page="integrations" data-customized="true" />
      </Head>
      <div className={clsx("refine-prose, pb-16")}>
        <CommonHeader hasSticky />
        <div className={clsx("max-w-[944px]", "mx-auto", "pt-16 px-4 sm:px-6")}>
          {children}
        </div>
      </div>
      <BlogFooter />
    </CommonLayout>
  );
};

export default IntegrationsLayout;
