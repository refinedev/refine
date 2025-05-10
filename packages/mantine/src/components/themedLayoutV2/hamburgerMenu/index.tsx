import React from "react";
import { ActionIcon } from "@mantine/core";
import {
  IconMenu2,
  IconIndentDecrease,
  IconIndentIncrease,
} from "@tabler/icons-react";

import { useThemedLayoutContext } from "@hooks";

export const HamburgerMenu: React.FC = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <>
      <ActionIcon
        visibleFrom="md"
        variant="subtle"
        color="gray"
        style={{
          border: "none",
        }}
        size="lg"
        onClick={() => setSiderCollapsed(!siderCollapsed)}
      >
        {siderCollapsed ? (
          <IconIndentIncrease size={20} />
        ) : (
          <IconIndentDecrease size={20} />
        )}
      </ActionIcon>
      <ActionIcon
        hiddenFrom="md"
        variant="subtle"
        color="gray"
        style={{
          border: "none",
        }}
        size="lg"
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
      >
        <IconMenu2 size={20} />
      </ActionIcon>
    </>
  );
};
