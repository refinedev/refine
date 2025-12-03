const getUrlToCheck = (currentUrl, deploymentUrl) => {
  const url = new URL(currentUrl);
  url.hostname = new URL(deploymentUrl).hostname;
  return url.toString();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const checkUrl = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { status } = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "refine-link-checker",
        },
      });
      return [status, new URL(url).pathname];
    } catch (error) {
      if (i === retries - 1) {
        console.error(
          `Failed to fetch ${new URL(url).pathname} after ${retries} attempts:`,
          error.message,
        );
        return [500, new URL(url).pathname];
      }
      // Wait before retrying
      await sleep(1000 * (i + 1));
    }
  }
};

const toChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const checkChunk = async (chunk, deploymentUrl, success, fail) => {
  for (const url of chunk) {
    const [status, pathname] = await checkUrl(
      getUrlToCheck(url, deploymentUrl),
    );
    if (status === 200) {
      success.push(pathname);
    } else {
      fail.push(pathname);
    }
    // Small delay between requests to avoid overwhelming the server
    await sleep(100);
  }
};

const checkExistingLinks = async (sitemapUrl, deploymentUrl) => {
  const data = await (await fetch(sitemapUrl)).text();

  const urls = data.match(/<loc>(.*?)<\/loc>/g).map((loc) => {
    return loc.replace("<loc>", "").replace("</loc>", "");
  });

  const success = [];
  const fail = [];

  console.log("Checking for existing urls in:", sitemapUrl);
  console.log("Deployment url:", deploymentUrl);
  console.log(`Total URLs to check: ${urls.length}`);

  const chunks = toChunks(urls, 50);

  let done = 0;

  for (const chunk of chunks) {
    done++;
    console.log(
      `Checking chunk ${done}/${chunks.length} (${
        success.length + fail.length
      }/${urls.length} URLs processed)`,
    );
    await checkChunk(chunk, deploymentUrl, success, fail);
  }

  console.log(`\nResults: ${success.length} successful, ${fail.length} failed`);

  if (fail.length > 0) {
    console.log("Broken links:");
    fail.forEach((link) => {
      console.log(link);
    });
    process.exit(1);
  }
};

if (!process.env.DEPLOY_URL) {
  console.log("DEPLOY_URL is not defined");
  process.exit(1);
}

checkExistingLinks(
  process.env.SITEMAP_URL ?? "https://refine.dev/sitemap.xml",
  process.env.DEPLOY_URL,
);
