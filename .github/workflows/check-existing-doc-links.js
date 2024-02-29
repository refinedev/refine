const getUrlToCheck = (currentUrl, deploymentUrl) => {
  const url = new URL(currentUrl);
  url.hostname = new URL(deploymentUrl).hostname;
  return url.toString();
};

const checkUrl = async (url) => {
  const { status } = await fetch(url, {
    method: "GET",
  });
  return [status, new URL(url).pathname];
};

const toChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const checkChunk = (chunk, deploymentUrl, success, fail) => {
  return new Promise((resolve) => {
    const promises = chunk.map((url) => {
      return checkUrl(getUrlToCheck(url, deploymentUrl));
    });

    Promise.all(promises).then((results) => {
      results.forEach(([status, url]) => {
        if (status === 200) {
          success.push(url);
        } else {
          fail.push(url);
        }
      });
      resolve();
    });
  });
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

  const chunks = toChunks(urls, 10);

  let done = 0;

  for (const chunk of chunks) {
    console.log(`Checking chunk ${done + 1}/${chunks.length}`);
    done++;
    await checkChunk(chunk, deploymentUrl, success, fail);
  }

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
