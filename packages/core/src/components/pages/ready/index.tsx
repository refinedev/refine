import React from "react";

/**
 * **refine** shows a default ready page on root route when no `resources` is passed to the `<Refine>` component as a property.
 *
 * @deprecated `ReadyPage` is deprecated and will be removed in the next major release.
 */
export const ReadyPage: React.FC = () => {
  return (
    <>
      <h1>Welcome on board</h1>
      <p>Your configuration is completed.</p>
      <p>
        Now you can get started by adding your resources to the{" "}
        <code>`resources`</code> property of <code>{"`<Refine>`"}</code>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <a href="https://refine.dev" target="_blank" rel="noreferrer">
          <button>Documentation</button>
        </a>
        <a href="https://refine.dev/examples" target="_blank" rel="noreferrer">
          <button>Examples</button>
        </a>
        <a href="https://discord.gg/refine" target="_blank" rel="noreferrer">
          <button>Community</button>
        </a>
      </div>
    </>
  );
};
