import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OneToMany() {
    return (
        <Sandpack
            dependencies={{
                "@refinedev/core": "latest",
                "react-router-dom": "latest",
                "react-router": "latest",
            }}
            startRoute="/"
            files={{
                "/App.tsx": {
                    code: AppTsxCode,
                    hidden: false,
                },
                "/post.tsx": {
                    code: PostTsxCode,
                    hidden: false,
                    active: true,
                },
                "/data-provider.ts": {
                    code: DataProviderCode,
                    hidden: false,
                },
            }}
        />
    );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { Post } from "./post.tsx";
import { dataProvider } from "./data-provider.ts";


export default function App() {
    return (
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            >
                <Post />
            </Refine>
    );
}
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({ id, resource }) => {
    const response = await fetch(\`\${url}/\${resource}/\${id}\`);
      const data = await response.json();

      return {
          data,
      };
  },

  getMany: async ({ ids, resource }) => {
    // converting array to query-string (eg. [1,2,3] => id=1&id=2&id=3)
    const idQuery = ids.map((id) => \`id=\${id}\`).join("&");
    const response = await fetch(\`\${url}/\${resource}?\${idQuery}\`);
    const data = await response.json();

    return {
        data,
    };
  },


  create: async () => {
      throw new Error("Not implemented");
  },
  update: async () => {
      throw new Error("Not implemented");
  },
  deleteOne: async () => {
      throw new Error("Not implemented");
  },
  getList: async () => {
      throw new Error("Not implemented");
  },
  getApiUrl: () => url,
});
`.trim();

const PostTsxCode = `
import React from "react";
import { useOne, useMany, BaseKey } from "@refinedev/core";

export const Post: React.FC = () => {
    const { data: postData, isLoading: postLoading } = useOne<IPost>({
        resource: "posts",
        id: 123,
    });

    const { data: tagData, isLoading: tagLoading } = useMany<ITag>({
        resource: "tags",
        ids:  postData?.data?.tags || [],
        queryOptions: {
            enabled: !!postData?.data?.tags?.length,
        },
    });

    const loading = postLoading || tagLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{postData?.data?.title}</h4>
            <pre>Content: {postData?.data?.content}</pre>
            <h4>Tags</h4>
            <ul>
                {tagData?.data?.map((tag) => (
                    <li key={tag.id}>{tag.title}</li>
                ))}
            </ul>
        </div>
    );
};


interface IPost {
    id: BaseKey;
    title: string;
    content: string;
    tags: BaseKey[];
}

interface ITag {
    id: BaseKey;
    title: string;
}
`.trim();
