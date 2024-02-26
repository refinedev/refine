import React from "react";
import Head from "@docusaurus/Head";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { RefineWeek } from "@site/src/components/refine-week";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";

const RefineWeekSupabase = () => {
  return (
    <CommonLayout>
      <div className="refine-prose">
        <Head title="Week of Refine | Refine">
          <html data-page="week-of-refine" data-customized="true" />
        </Head>

        <CommonHeader hasSticky={true} />
        <RefineWeek variant="supabase" />
        <BlogFooter />
      </div>
    </CommonLayout>
  );
};

export default RefineWeekSupabase;
