const blogPluginExports = require("@docusaurus/plugin-content-blog");
const utils = require("@docusaurus/utils");
const path = require("path");

const defaultBlogPlugin = blogPluginExports.default;

const pluginDataDirRoot = path.join(
  ".docusaurus",
  "docusaurus-plugin-content-blog",
);
const aliasedSource = (source) =>
  `~blog/${utils.posixPath(path.relative(pluginDataDirRoot, source))}`;

function paginateBlogPosts({
  blogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
}) {
  const totalCount = blogPosts.length;
  const postsPerPage =
    postsPerPageOption === "ALL" ? totalCount : postsPerPageOption;

  const numberOfPages = Math.ceil(totalCount / postsPerPage);

  const pages = [];

  function permalink(page) {
    return page > 0
      ? utils.normalizeUrl([basePageUrl, `page/${page + 1}`])
      : basePageUrl;
  }

  for (let page = 0; page < numberOfPages; page += 1) {
    pages.push({
      items: blogPosts
        .slice(page * postsPerPage, (page + 1) * postsPerPage)
        .map((item) => item.id),
      metadata: {
        permalink: permalink(page),
        page: page + 1,
        postsPerPage,
        totalPages: numberOfPages,
        totalCount,
        previousPage: page !== 0 ? permalink(page - 1) : undefined,
        nextPage: page < numberOfPages - 1 ? permalink(page + 1) : undefined,
        blogDescription,
        blogTitle,
      },
    });
  }

  return pages;
}

function getMultipleRandomElement(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function getReletadPosts(allBlogPosts, metadata) {
  const relatedPosts = allBlogPosts.filter(
    (post) =>
      post.metadata.frontMatter.tags?.some((tag) =>
        metadata.frontMatter.tags?.includes(tag),
      ) && post.metadata.title !== metadata.title,
  );

  const randomThreeRelatedPosts = getMultipleRandomElement(relatedPosts, 3);

  const filteredPostInfos = randomThreeRelatedPosts.map((post) => {
    return {
      title: post.metadata.title,
      description: post.metadata.description,
      permalink: post.metadata.permalink,
      formattedDate: post.metadata.formattedDate,
      authors: post.metadata.authors,
      readingTime: post.metadata.readingTime,
      date: post.metadata.date,
    };
  });

  return filteredPostInfos;
}

function getAuthorPosts(allBlogPosts, metadata) {
  const authorPosts = allBlogPosts.filter(
    (post) =>
      post.metadata.frontMatter.authors === metadata.frontMatter.authors &&
      post.metadata.title !== metadata.title,
  );

  const randomThreeAuthorPosts = getMultipleRandomElement(authorPosts, 3);

  const filteredPostInfos = randomThreeAuthorPosts.map((post) => {
    return {
      title: post.metadata.title,
      description: post.metadata.description,
      permalink: post.metadata.permalink,
      formattedDate: post.metadata.formattedDate,
      authors: post.metadata.authors,
      readingTime: post.metadata.readingTime,
      date: post.metadata.date,
    };
  });

  return filteredPostInfos;
}

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  const { blogTitle, blogDescription, postsPerPage } = pluginArgs[1];

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */
    contentLoaded: async function (data) {
      const { content: blogContents, actions } = data;
      const { addRoute, createData } = actions;
      const {
        blogPosts: allBlogPosts,
        blogTags,
        blogTagsListPath,
      } = blogContents;

      const blogItemsToMetadata = {};

      function blogPostItemsModule(items) {
        return items.map((postId) => {
          const blogPostMetadata = blogItemsToMetadata[postId];

          return {
            content: {
              __import: true,
              path: blogPostMetadata.source,
              query: {
                truncated: true,
              },
            },
          };
        });
      }

      const featuredBlogPosts = allBlogPosts.filter(
        (post) => post.metadata.frontMatter.is_featured === true,
      );

      const blogPosts = allBlogPosts.filter(
        (post) => post.metadata.frontMatter.is_featured !== true,
      );

      const blogListPaginated = paginateBlogPosts({
        blogPosts,
        basePageUrl: "/blog",
        blogTitle,
        blogDescription,
        postsPerPageOption: postsPerPage,
      });

      // Create routes for blog entries.
      await Promise.all(
        allBlogPosts.map(async (blogPost) => {
          const { id, metadata } = blogPost;

          const relatedPosts = getReletadPosts(allBlogPosts, metadata);

          const authorPosts = getAuthorPosts(allBlogPosts, metadata);

          await createData(
            // Note that this created data path must be in sync with
            // metadataPath provided to mdx-loader.
            `${utils.docuHash(metadata.source)}.json`,
            JSON.stringify({ ...metadata, relatedPosts, authorPosts }, null, 2),
          );

          addRoute({
            path: metadata.permalink,
            component: "@theme/BlogPostPage",
            exact: true,
            modules: {
              content: metadata.source,
            },
          });

          blogItemsToMetadata[id] = metadata;
        }),
      );

      // Create routes for blog's paginated list entries.
      await Promise.all(
        blogListPaginated.map(async (listPage) => {
          const { metadata, items } = listPage;
          const { permalink } = metadata;

          const pageMetadataPath = await createData(
            `${utils.docuHash(permalink)}.json`,
            JSON.stringify(metadata, null, 2),
          );

          const tagsProp = Object.values(blogTags).map((tag) => ({
            label: tag.label,
            permalink: tag.permalink,
            count: tag.items.length,
          }));

          const tagsPropPath = await createData(
            `${utils.docuHash(`${blogTagsListPath}-tags`)}.json`,
            JSON.stringify(tagsProp, null, 2),
          );

          addRoute({
            path: permalink,
            component: "@theme/BlogListPage",
            exact: true,
            modules: {
              items: blogPostItemsModule(
                permalink === "/blog"
                  ? [...items, ...featuredBlogPosts.map((post) => post.id)]
                  : items,
              ),
              metadata: aliasedSource(pageMetadataPath),
              tags: aliasedSource(tagsPropPath),
            },
          });
        }),
      );

      const authorsArray = allBlogPosts
        .map((post) => post.metadata.frontMatter.authors)
        .filter((authorName) => authorName !== undefined);
      const uniqueAuthors = [...new Set(authorsArray)];

      uniqueAuthors.map(async (author) => {
        const authorPosts = allBlogPosts.filter(
          (post) => post.metadata.frontMatter.authors === author,
        );

        const authorListPaginated = paginateBlogPosts({
          blogPosts: authorPosts,
          basePageUrl: "/blog/author/" + author,
          blogTitle,
          blogDescription,
          postsPerPageOption: "ALL",
        });

        authorListPaginated.map((authorListPage) => {
          const { metadata, items } = authorListPage;
          const { permalink } = metadata;

          addRoute({
            path: permalink,
            component: "@site/src/components/blog/author-page",
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
            },
          });
        });
      });

      // Tags. This is the last part so we early-return if there are no tags.
      if (Object.keys(blogTags).length === 0) {
        return;
      }

      async function createTagsListPage() {
        const tagsProp = Object.values(blogTags).map((tag) => ({
          label: tag.label,
          permalink: tag.permalink,
          count: tag.items.length,
        }));

        const tagsPropPath = await createData(
          `${utils.docuHash(`${blogTagsListPath}-tags`)}.json`,
          JSON.stringify(tagsProp, null, 2),
        );

        addRoute({
          path: blogTagsListPath,
          component: "@theme/BlogTagsListPage",
          exact: true,
          modules: {
            tags: aliasedSource(tagsPropPath),
          },
        });
      }

      async function createTagPostsListPage(tag) {
        await Promise.all(
          tag.pages.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;
            const tagProp = {
              label: tag.label,
              permalink: tag.permalink,
              allTagsPath: blogTagsListPath,
              count: tag.items.length,
            };
            const tagPropPath = await createData(
              `${utils.docuHash(metadata.permalink)}.json`,
              JSON.stringify(tagProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(metadata.permalink)}-list.json`,
              JSON.stringify(metadata, null, 2),
            );

            const tagsProp = Object.values(blogTags).map((tag) => ({
              label: tag.label,
              permalink: tag.permalink,
              count: tag.items.length,
            }));

            const tagsPropPath = await createData(
              `${utils.docuHash(`${blogTagsListPath}-tags`)}.json`,
              JSON.stringify(tagsProp, null, 2),
            );

            addRoute({
              path: metadata.permalink,
              component: "@theme/BlogTagsPostsPage",
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                tag: aliasedSource(tagPropPath),
                tags: aliasedSource(tagsPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          }),
        );
      }

      await createTagsListPage();
      await Promise.all(Object.values(blogTags).map(createTagPostsListPage));
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
