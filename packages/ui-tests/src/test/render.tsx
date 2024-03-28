import React from "react";

// @see https://mantine.dev/guides/jest/
import { render, RenderOptions } from "@testing-library/react";

export function customRender(ui: React.ReactNode, options?: RenderOptions) {
  // @ts-ignore
  if (window.MantineProvider) {
    // @ts-ignore
    const MantineProvider = window.MantineProvider;
    if (!options) {
      return render(<>{ui}</>, {
        wrapper: MantineProvider,
      });
    }
    if (!options.wrapper) {
      options.wrapper = MantineProvider;
    } else {
      const Wrapper = options.wrapper;
      options.wrapper = ({
        children,
        ...rest
      }: { children: React.ReactElement }) => {
        return (
          <MantineProvider>
            <Wrapper {...rest}>{children}</Wrapper>
          </MantineProvider>
        );
      };
    }
  }

  return render(<>{ui}</>, options);
}
