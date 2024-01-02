import MDXComponents from "@theme-original/MDXComponents";

import { BannerRandom } from "@site/src/components/banner/banner-random";
import DiscordBanner from "@site/src/components/blog/discord-banner";
import GithubBanner from "@site/src/components/blog/github-banner";
import PromotionBanner from "@site/src/components/blog/promotion";
import TwitterBanner from "@site/src/components/blog/twitter-banner";
import Checklist from "@site/src/components/checklist";
import ChecklistItem from "@site/src/components/checklist-item";
import CodeSandboxExample from "@site/src/components/codesandbox-example";
import ExampleLocalPrompt from "@site/src/components/example-local-prompt";
import ExampleSourcePrompt from "@site/src/components/example-source-prompt";
import GeneralConceptsLink from "@site/src/components/general-concepts-link";
import { GlobalConfigBadge } from "@site/src/components/global-config-badge";
import { GuideBadge } from "@site/src/components/guide-badge";
import PropTag from "@site/src/components/prop-tag";
import PropsTable from "@site/src/components/props-table";
import { RouterBadge } from "@site/src/components/router-badge";
import { Sandpack } from "@site/src/components/sandpack";
import UIConditional from "@site/src/components/ui-conditional";
import CommonDetails from "@site/src/refine-theme/common-details";
import CommonSummary from "@site/src/refine-theme/common-summary";
import CommonTabItem from "@site/src/refine-theme/common-tab-item";
import CommonTabs from "@site/src/refine-theme/common-tabs";
import { Image } from "@site/src/components/image";
import { Table } from "@site/src/refine-theme/common-table";
import { CreateRefineAppCommand } from "@site/src/partials/npm-scripts/create-refine-app-command.tsx";
import { InstallPackagesCommand } from "@site/src/partials/npm-scripts/install-packages-commands";

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
    Sandpack,
    GuideBadge,
    RouterBadge,
    GlobalConfigBadge,
    Image,
    table: Table,
    CreateRefineAppCommand: CreateRefineAppCommand,
    InstallPackagesCommand: InstallPackagesCommand,
};
