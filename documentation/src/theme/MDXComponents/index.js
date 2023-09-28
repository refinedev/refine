import React from "react";

import MDXComponents from "@theme-original/MDXComponents";

import DiscordBanner from "@site/src/components/blog/discord-banner";
import GithubBanner from "@site/src/components/blog/github-banner";
import TwitterBanner from "@site/src/components/blog/twitter-banner";
import PropsTable from "@site/src/components/props-table";
import PromotionBanner from "@site/src/components/blog/promotion";
import UIConditional from "@site/src/components/ui-conditional";
import PropTag from "@site/src/components/prop-tag";
import CodeSandboxExample from "@site/src/components/codesandbox-example";
import ExampleSourcePrompt from "@site/src/components/example-source-prompt";
import ExampleLocalPrompt from "@site/src/components/example-local-prompt";
import Checklist from "@site/src/components/checklist";
import ChecklistItem from "@site/src/components/checklist-item";
import GeneralConceptsLink from "@site/src/components/general-concepts-link";
import CommonTabs from "@site/src/refine-theme/common-tabs";
import CommonTabItem from "@site/src/refine-theme/common-tab-item";
import CommonDetails from "@site/src/refine-theme/common-details";
import CommonSummary from "@site/src/refine-theme/common-summary";
import { BannerRandom } from "@site/src/components/banner/banner-random";

export default {
    ...MDXComponents,
    Checklist: Checklist,
    ChecklistItem: ChecklistItem,
    UIConditional: UIConditional,
    DiscordBanner: DiscordBanner,
    GithubBanner: GithubBanner,
    TwitterBanner: TwitterBanner,
    PropsTable: PropsTable,
    PropTag: PropTag,
    details: CommonDetails,
    summary: CommonSummary,
    PromotionBanner: PromotionBanner,
    Tabs: CommonTabs,
    TabItem: CommonTabItem,
    GeneralConceptsLink,
    CodeSandboxExample,
    ExampleLocalPrompt,
    ExampleSourcePrompt,
    BannerRandom,
};
