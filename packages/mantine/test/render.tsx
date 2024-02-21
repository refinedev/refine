import React from "react";

// @see https://mantine.dev/guides/jest/
//
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { defaultTheme } from '../src/theme';
import { ITestWrapperProps } from ".";

type Options = RenderOptions<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>

const DefaultWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <MantineProvider theme={defaultTheme}>{children}</MantineProvider>
    )
}
// Then
export function customRender(
    ui: React.ReactNode,
    options?: Options,
) {
    if (options) {
        if (!options.wrapper) {
            options.wrapper = DefaultWrapper;
        }
        return render(<>{ui}</>, options);
    }

    return render(<>{ui}</>, {
        wrapper: DefaultWrapper
    });
}
