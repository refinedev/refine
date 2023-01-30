import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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
    PromotionBanner: PromotionBanner,
    Tabs: Tabs,
    TabItem: TabItem,
    GeneralConceptsLink,
    CodeSandboxExample,
    ExampleLocalPrompt,
    ExampleSourcePrompt,
};
