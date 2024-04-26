import { PropsWithChildren } from "react";

export const CommonLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        maxWidth: "1280px",
        padding: "24px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};
