import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import DiscordBanner from "@site/src/components/blog/discord-banner";
import GithubBanner from "@site/src/components/blog/github-banner";
import TwitterBanner from "@site/src/components/blog/twitter-banner";
import PropsTable from "@site/src/components/props-table";
import PromotionBanner from "@site/src/components/blog/promotion";
import PropTag from "../../components/prop-tag";

export default {
    ...MDXComponents,
    DiscordBanner: DiscordBanner,
    GithubBanner: GithubBanner,
    TwitterBanner: TwitterBanner,
    PropsTable: PropsTable,
    PropTag: PropTag,
    PromotionBanner: PromotionBanner,
    Tabs: Tabs,
    TabItem: TabItem,
};
