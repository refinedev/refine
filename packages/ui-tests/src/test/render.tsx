import React from "react";

// @see https://mantine.dev/guides/jest/
import { render, RenderOptions } from '@testing-library/react';

export function customRender(
    ui: React.ReactNode,
    options?: RenderOptions,
) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.MantineProvider) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const MantineProvider = window.MantineProvider;
        if (!options) {
            return render(<>{ui}</>, {
                wrapper: MantineProvider,
            });
        }
        if (!options.wrapper) {
            options.wrapper = MantineProvider;
        }
    };

    return render(<>{ui}</>, options);
}
