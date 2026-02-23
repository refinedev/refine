const blogPluginExports = require("@docusaurus/plugin-content-blog");
const utils = require("@docusaurus/utils");
const path = require("path");

const defaultBlogPlugin = blogPluginExports.default;
const DEFAULT_BLOG_CATEGORY = "Engineering";
const DEFAULT_POSTS_PER_PAGE_MODE = "ALL";
const PAGINATION_PATH_SEGMENT = "page";
const RANDOM_POSTS_LIMIT = 3;
const CATEGORY_FALLBACK_SLUG = "category";
const BLOG_BASE_PATH = "/blog";
const BLOG_CATEGORIES_LIST_PATH = `${BLOG_BASE_PATH}/categories`;
const BLOG_AUTHORS_BASE_PATH = `${BLOG_BASE_PATH}/author`;
const ALL_TAGS_LABEL = "All tags";
const TAGS_DATA_SUFFIX = "-tags";
const CATEGORIES_DATA_SUFFIX = "-categories";
const CATEGORY_DATA_SUFFIX = "-category";
const ALL_TAGS_DATA_SUFFIX = "-all-tags";
const LIST_DATA_SUFFIX = "-list";
const DOCUSAURUS_DATA_DIR = ".docusaurus";
const CONTENT_BLOG_PLUGIN_DIR = "docusaurus-plugin-content-blog";
const BLOG_ALIAS_PREFIX = "~blog";
const JSON_FILE_EXTENSION = ".json";
const IS_FEATURED_FRONTMATTER_KEY = "is_featured";
const BLOG_POST_PAGE_COMPONENT = "@theme/BlogPostPage";
const BLOG_LIST_PAGE_COMPONENT = "@theme/BlogListPage";
const BLOG_AUTHOR_PAGE_COMPONENT = "@site/src/components/blog/author-page";
const BLOG_TAGS_POSTS_PAGE_COMPONENT = "@theme/BlogTagsPostsPage";
const BLOG_CATEGORIES_LIST_PAGE_COMPONENT = "@theme/BlogCategoriesListPage";
const BLOG_CATEGORY_POSTS_PAGE_COMPONENT = "@theme/BlogCategoryPostsPage";
const ALLOWED_CATEGORIES = [
  "AI & Innovation",
  "Alternatives",
  "Announcement",
  "Ecosystem / Integrations",
  "Engineering",
  "How To Build",
  "Tutorials",
];
const ALLOWED_TAGS = [
  "admin-panel",
  "ai",
  "ant-design",
  "backend",
  "bugs",
  "chakra-ui",
  "comparison",
  "css",
  "dashboards",
  "dev-tools",
  "docker",
  "git",
  "javascript",
  "kubernetes",
  "material-ui",
  "nextjs",
  "opensource",
  "react",
  "redux",
  "refine-week",
  "strapi",
  "supabase",
  "tailwind",
  "tech-industry",
  "typescript",
];
const allowedCategoryAndTagValues = {
  categories: new Set(ALLOWED_CATEGORIES),
  tags: new Set(ALLOWED_TAGS),
};

const pluginDataDirRoot = path.join(
  DOCUSAURUS_DATA_DIR,
  CONTENT_BLOG_PLUGIN_DIR,
);
const aliasedSource = (source) =>
  `${BLOG_ALIAS_PREFIX}/${utils.posixPath(path.relative(pluginDataDirRoot, source))}`;

function formatBlogDate(dateValue) {
  if (!dateValue) {
    return dateValue;
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return shortDateFormatter.format(parsedDate).toUpperCase();
}

function paginateBlogPosts({
  blogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
}) {
  const totalCount = blogPosts.length;
  const postsPerPage =
    postsPerPageOption === DEFAULT_POSTS_PER_PAGE_MODE
      ? totalCount
      : postsPerPageOption;

  const numberOfPages = Math.ceil(totalCount / postsPerPage);

  const pages = [];

  function permalink(page) {
    return page > 0
      ? utils.normalizeUrl([basePageUrl, `${PAGINATION_PATH_SEGMENT}/${page + 1}`])
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

function toPostInfo(post) {
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    permalink: post.metadata.permalink,
    formattedDate: post.metadata.formattedDate,
    authors: post.metadata.authors,
    readingTime: post.metadata.readingTime,
    date: post.metadata.date,
  };
}

function getRelatedPosts(allBlogPosts, metadata) {
  const relatedPosts = allBlogPosts.filter(
    (post) =>
      post.metadata.frontMatter.tags?.some((tag) =>
        metadata.frontMatter.tags?.includes(tag),
      ) && post.metadata.title !== metadata.title,
  );

  return getMultipleRandomElement(relatedPosts, RANDOM_POSTS_LIMIT).map(
    toPostInfo,
  );
}

function getAuthorPosts(allBlogPosts, metadata) {
  const authorPosts = allBlogPosts.filter(
    (post) =>
      post.metadata.frontMatter.authors === metadata.frontMatter.authors &&
      post.metadata.title !== metadata.title,
  );

  return getMultipleRandomElement(authorPosts, RANDOM_POSTS_LIMIT).map(
    toPostInfo,
  );
}

function getBlogPostCategory(frontMatter = {}) {
  const { category } = frontMatter;
  const normalized = typeof category === "string" ? category.trim() : "";
  return normalized || DEFAULT_BLOG_CATEGORY;
}

function toCategorySlug(label) {
  const normalized = `${label}`
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized;
  }

  return encodeURIComponent(`${label}`.trim().toLowerCase());
}

function toCategoryName(label = "") {
  let value = `${label}`.trim().replace(/-/g, " ");

  if (!value) {
    return "";
  }

  value = value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const replacements = [
    ["Ai", "AI"],
    ["Ui", "UI"],
    ["Ux", "UX"],
    ["Api", "API"],
    ["Ecosystem / Integrations", "Integrations"],
  ];

  replacements.forEach(([from, to]) => {
    value = value.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  });

  return value;
}

function getBlogPostCategoryData({ frontMatter = {}, blogCategories = {} }) {
  const value = getBlogPostCategory(frontMatter);
  const categoryKey = value.toLowerCase();
  const existingCategory = blogCategories[categoryKey];

  return {
    value,
    label: existingCategory.name,
    permalink: existingCategory.permalink,
  };
}

function createBlogCategories({
  allBlogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
}) {
  const categories = {};
  const usedSlugs = new Set();

  function getUniqueCategorySlug(baseSlug) {
    let suffix = 2;
    let candidate = baseSlug || CATEGORY_FALLBACK_SLUG;

    while (usedSlugs.has(candidate)) {
      candidate = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(candidate);

    return candidate;
  }

  allBlogPosts.forEach((post) => {
    const categoryValue = getBlogPostCategory(post.metadata.frontMatter);
    const categoryKey = categoryValue.toLowerCase();

    if (!categories[categoryKey]) {
      const uniqueSlug = getUniqueCategorySlug(toCategorySlug(categoryValue));
      categories[categoryKey] = {
        value: categoryValue,
        name: toCategoryName(categoryValue),
        permalink: utils.normalizeUrl([basePageUrl, uniqueSlug]),
        items: [],
      };
    }

    categories[categoryKey].items.push(post);
  });

  Object.values(categories).forEach((category) => {
    category.pages = paginateBlogPosts({
      blogPosts: category.items,
      basePageUrl: category.permalink,
      blogTitle,
      blogDescription,
      postsPerPageOption,
    });
  });

  return categories;
}

function mapTagsProp(blogTags) {
  return Object.values(blogTags).map((tag) => ({
    label: tag.label,
    permalink: tag.permalink,
    count: tag.items.length,
  }));
}

function mapCategoriesProp(blogCategories) {
  return Object.values(blogCategories).map((category) => ({
    value: category.value,
    name: category.name,
    permalink: category.permalink,
    count: category.items.length,
  }));
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => `${tag}`.trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && tag !== "-");
  }

  return [];
}

function validateCategoryAndTags({ allBlogPosts, allowedValues }) {
  const invalidCategories = [];
  const invalidTags = [];
  const unknownCategories = new Set();
  const unknownTags = new Set();

  allBlogPosts.forEach((post) => {
    const frontMatter = post.metadata.frontMatter || {};
    const postSlug = frontMatter.slug || post.metadata.permalink || post.id;
    const category = getBlogPostCategory(frontMatter);

    if (!allowedValues.categories.has(category)) {
      unknownCategories.add(category);
      invalidCategories.push(`- ${postSlug}: "${category}"`);
    }

    normalizeTags(frontMatter.tags).forEach((tag) => {
      if (!allowedValues.tags.has(tag)) {
        unknownTags.add(tag);
        invalidTags.push(`- ${postSlug}: "${tag}"`);
      }
    });
  });

  if (unknownCategories.size === 0 && unknownTags.size === 0) {
    return;
  }

  const messageLines = [
    "[blog-plugin] Invalid category/tag values found in blog frontmatter.",
    "",
  ];

  if (unknownCategories.size > 0) {
    messageLines.push(
      `Unknown categories (${unknownCategories.size}): ${[...unknownCategories]
        .sort()
        .join(", ")}`,
    );
    messageLines.push(...invalidCategories);
    messageLines.push("");
  }

  if (unknownTags.size > 0) {
    messageLines.push(
      `Unknown tags (${unknownTags.size}): ${[...unknownTags].sort().join(", ")}`,
    );
    messageLines.push(...invalidTags);
    messageLines.push("");
  }

  messageLines.push("Update ALLOWED_CATEGORIES / ALLOWED_TAGS in blog-plugin.js.");

  throw new Error(messageLines.join("\n"));
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
      const blogCategoriesListPath = BLOG_CATEGORIES_LIST_PATH;

      validateCategoryAndTags({
        allBlogPosts,
        allowedValues: allowedCategoryAndTagValues,
      });

      allBlogPosts.forEach((post) => {
        post.metadata.formattedDate = formatBlogDate(post.metadata.date);
      });

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
        (post) => post.metadata.frontMatter[IS_FEATURED_FRONTMATTER_KEY] === true,
      );
      const featuredBlogPostIds = featuredBlogPosts.map((post) => post.id);

      const blogPosts = allBlogPosts.filter(
        (post) => post.metadata.frontMatter[IS_FEATURED_FRONTMATTER_KEY] !== true,
      );

      const blogListPaginated = paginateBlogPosts({
        blogPosts,
        basePageUrl: BLOG_BASE_PATH,
        blogTitle,
        blogDescription,
        postsPerPageOption: postsPerPage,
      });

      const blogCategories = createBlogCategories({
        allBlogPosts,
        basePageUrl: blogCategoriesListPath,
        blogTitle,
        blogDescription,
        postsPerPageOption: postsPerPage,
      });
      const tagsProp = mapTagsProp(blogTags);
      const categoriesProp = mapCategoriesProp(blogCategories);
      let tagsPropPathPromise;
      let categoriesPropPathPromise;

      function getTagsPropPath() {
        if (!tagsPropPathPromise) {
          tagsPropPathPromise = createData(
            `${utils.docuHash(`${blogTagsListPath}${TAGS_DATA_SUFFIX}`)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(tagsProp, null, 2),
          );
        }

        return tagsPropPathPromise;
      }

      function getCategoriesPropPath() {
        if (!categoriesPropPathPromise) {
          categoriesPropPathPromise = createData(
            `${utils.docuHash(`${blogCategoriesListPath}${CATEGORIES_DATA_SUFFIX}`)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(categoriesProp, null, 2),
          );
        }

        return categoriesPropPathPromise;
      }

      // Create routes for blog entries.
      await Promise.all(
        allBlogPosts.map(async (blogPost) => {
          const { id, metadata } = blogPost;

          const relatedPosts = getRelatedPosts(allBlogPosts, metadata);

          const authorPosts = getAuthorPosts(allBlogPosts, metadata);
          const category = getBlogPostCategoryData({
            frontMatter: metadata.frontMatter,
            blogCategories,
          });

          await createData(
            // Note that this created data path must be in sync with
            // metadataPath provided to mdx-loader.
            `${utils.docuHash(metadata.source)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(
              { ...metadata, relatedPosts, authorPosts, category },
              null,
              2,
            ),
          );

          addRoute({
            path: metadata.permalink,
            component: BLOG_POST_PAGE_COMPONENT,
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
            `${utils.docuHash(permalink)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(metadata, null, 2),
          );

          const [tagsPropPath, categoriesPropPath] = await Promise.all([
            getTagsPropPath(),
            getCategoriesPropPath(),
          ]);

          addRoute({
            path: permalink,
            component: BLOG_LIST_PAGE_COMPONENT,
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
              featuredPosts: blogPostItemsModule(featuredBlogPostIds),
              metadata: aliasedSource(pageMetadataPath),
              tags: aliasedSource(tagsPropPath),
              categories: aliasedSource(categoriesPropPath),
            },
          });
        }),
      );

      const authorsArray = allBlogPosts
        .map((post) => post.metadata.frontMatter.authors)
        .filter((authorName) => authorName !== undefined);
      const uniqueAuthors = [...new Set(authorsArray)];

      uniqueAuthors.forEach((author) => {
        const authorPosts = allBlogPosts.filter(
          (post) => post.metadata.frontMatter.authors === author,
        );

        const authorListPaginated = paginateBlogPosts({
          blogPosts: authorPosts,
          basePageUrl: `${BLOG_AUTHORS_BASE_PATH}/${author}`,
          blogTitle,
          blogDescription,
          postsPerPageOption: DEFAULT_POSTS_PER_PAGE_MODE,
        });

        authorListPaginated.forEach((authorListPage) => {
          const { metadata, items } = authorListPage;
          const { permalink } = metadata;

          addRoute({
            path: permalink,
            component: BLOG_AUTHOR_PAGE_COMPONENT,
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
            },
          });
        });
      });

      // This is the last part so we early-return if there are no tags/categories.
      const hasTags = Object.keys(blogTags).length > 0;
      const hasCategories = Object.keys(blogCategories).length > 0;

      if (!hasTags && !hasCategories) {
        return;
      }

      async function createTagsListPage() {
        const tagsPropPath = await getTagsPropPath();
        const allTagsListPaginated = paginateBlogPosts({
          blogPosts: allBlogPosts,
          basePageUrl: blogTagsListPath,
          blogTitle,
          blogDescription,
          postsPerPageOption: postsPerPage,
        });

        await Promise.all(
          allTagsListPaginated.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;

            const tagProp = {
              label: ALL_TAGS_LABEL,
              permalink: blogTagsListPath,
              allTagsPath: blogTagsListPath,
              count: allBlogPosts.length,
              isAllTagsPage: true,
            };

            const tagPropPath = await createData(
              `${utils.docuHash(`${metadata.permalink}${ALL_TAGS_DATA_SUFFIX}`)}${JSON_FILE_EXTENSION}`,
              JSON.stringify(tagProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(`${metadata.permalink}${ALL_TAGS_DATA_SUFFIX}`)}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            addRoute({
              path: metadata.permalink,
              component: BLOG_TAGS_POSTS_PAGE_COMPONENT,
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
              `${utils.docuHash(metadata.permalink)}${JSON_FILE_EXTENSION}`,
              JSON.stringify(tagProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(metadata.permalink)}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            const tagsPropPath = await getTagsPropPath();

            addRoute({
              path: metadata.permalink,
              component: BLOG_TAGS_POSTS_PAGE_COMPONENT,
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

      async function createCategoriesListPage() {
        const categoriesPropPath = await getCategoriesPropPath();

        addRoute({
          path: blogCategoriesListPath,
          component: BLOG_CATEGORIES_LIST_PAGE_COMPONENT,
          exact: true,
          modules: {
            categories: aliasedSource(categoriesPropPath),
          },
        });
      }

      async function createCategoryPostsListPage(category) {
        await Promise.all(
          category.pages.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;
            const categoryProp = {
              value: category.value,
              name: category.name,
              permalink: category.permalink,
              allCategoriesPath: blogCategoriesListPath,
              count: category.items.length,
            };
            const categoryPropPath = await createData(
              `${utils.docuHash(`${metadata.permalink}${CATEGORY_DATA_SUFFIX}`)}${JSON_FILE_EXTENSION}`,
              JSON.stringify(categoryProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(`${metadata.permalink}${CATEGORY_DATA_SUFFIX}`)}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            const categoriesPropPath = await getCategoriesPropPath();

            addRoute({
              path: metadata.permalink,
              component: BLOG_CATEGORY_POSTS_PAGE_COMPONENT,
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                featuredPosts: blogPostItemsModule(featuredBlogPostIds),
                category: aliasedSource(categoryPropPath),
                categories: aliasedSource(categoriesPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          }),
        );
      }

      if (hasTags) {
        await createTagsListPage();
        await Promise.all(Object.values(blogTags).map(createTagPostsListPage));
      }

      if (hasCategories) {
        await createCategoriesListPage();
        await Promise.all(
          Object.values(blogCategories).map(createCategoryPostsListPage),
        );
      }
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
