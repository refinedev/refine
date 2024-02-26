import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      files={{
        "src/App.tsx": {
          code: `
export default function App(): JSX.Element {
    return <h1>Hello world!</h1>
}
            `.trim(),
        },
      }}
    >
      {children}
    </TutorialSandpack>
  );
};
