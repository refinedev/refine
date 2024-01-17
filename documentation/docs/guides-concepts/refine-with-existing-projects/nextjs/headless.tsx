import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSHeadless() {
  return (
    <Sandpack
      template="nextjs"
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@types/react": "^18.0.0",
        "@types/node": "^18.0.0",
        typescript: "^4.7.4",
      }}
      customSetup={{
        entry: "pages/index.tsx",
        environment: "node",
      }}
      showNavigator
      showFiles
      showConsole
      files={{
        "pages/index.tsx": {
          code: IndexTsxCode.trim(),
        },
        "pages/refine-page.tsx": {
          code: RefinePageTsxCode.trim(),
        },
        "pages/other-page.tsx": {
          code: OtherPageTsxCode.trim(),
        },
        "pages/_app.tsx": {
          code: AppTsxCode.trim(),
          active: true,
        },
      }}
    />
  );
}

const IndexTsxCode = /* tsx */ `
export default function Home({ data }) {
  return (
    <div>
      <h1>Hello From Home</h1>
      <a href="/other-page">Go to Other Page</a>
      <br />
      <a href="/refine-page">Go to Refine Page</a>
    </div>
  );
}
`;

const AppTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export default function MyApp({ Component, pageProps }) {
  return (
    <Refine dataProvider={dataProvider(API_URL)}>
      <Component {...pageProps} />
    </Refine>
  );
}

`;

const RefinePageTsxCode = /* tsx */ `
import { useShow } from "@refinedev/core";

export default function RefinePage() {
  const { queryResult } = useShow({ resource: "products", id: 1 });

  return (
    <div>
      Hello From My Refine Component!
      <hr />
      <p>useShow hook queryResult:</p>
      <code>{JSON.stringify(queryResult.data, null, 2)}</code>
      <hr />
      <a href="/">Go to Home Page</a>
    </div>
  );
}
`;

const OtherPageTsxCode = /* tsx */ `
export default function OtherPage() {
  return (
    <div>
      <h1>Hello From Other Page</h1>
      <a href="/">Go to Home Page</a>
    </div>
  );
}
`;
