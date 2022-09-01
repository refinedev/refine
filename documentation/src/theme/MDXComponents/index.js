import React from "react";
import MDXComponents from "@theme-original/MDXComponents";

import DiscordBanner from "@site/src/components/blog/discord-banner";
import GithubBanner from "@site/src/components/blog/github-banner";

export default {
    ...MDXComponents,
    DiscordBanner: DiscordBanner,
    GithubBanner: GithubBanner,
};
