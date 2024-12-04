"use client";

import { Link, useOne, useShow } from "@refinedev/core";

export default function BlogPostShow() {
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <Link go={{ to: { resource: "blog_posts", action: "list" } }}>
        ← Go to list
      </Link>
      <br />

      <div>
        <h5>ID</h5>
        <div>{record?.id}</div>
      </div>

      <div>
        <h5>Title</h5>
        <div>{record?.title}</div>
      </div>

      <div>
        <h5>Content</h5>
        <div>{record?.content}</div>
      </div>

      <div>
        <h5>Category</h5>
        <div>
          {categoryIsLoading ? "Loading..." : categoryData?.data?.title}
        </div>
      </div>

      <div>
        <h5>Status</h5>
        <div>{record?.status}</div>
      </div>

      <div>
        <h5>Created At</h5>
        <div>
          {record?.createdAt && new Date(record.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
