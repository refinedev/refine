import React from "react";
import { Layout as AntLayout, Grid } from "antd";
import { Header } from "components";

export const Layout: React.FC = ({
  children,
  // OffLayoutArea,
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <AntLayout
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Header />
      <AntLayout.Content>
        <div
          style={{
            padding: breakpoint.sm ? 24 : 12,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </AntLayout.Content>
    </AntLayout>
  );
};
