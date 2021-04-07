import React from "react";
import { render, screen } from "@testing-library/react";
import { DemoSidebar } from "./";

describe("DemoSidebar", () => {
    test("renders without crashing", () => {
        render(
            <DemoSidebar
                title="test"
                mutationMode="pessimistic"
                warnWhenUnsavedChanges={false}
                syncWithLocation={false}
                onMutationModeChange={jest.fn()}
                onSyncWithLocationChange={jest.fn()}
                onTitleChange={jest.fn()}
                onWarnWhenUnsavedChangesChange={jest.fn()}
            />,
        );
    });

    test("Reacts when title change", () => {
        const { getByTestId } = render(
            <DemoSidebar
                title="test"
                mutationMode="pessimistic"
                warnWhenUnsavedChanges={false}
                syncWithLocation={false}
                onMutationModeChange={jest.fn()}
                onSyncWithLocationChange={jest.fn()}
                onTitleChange={jest.fn()}
                onWarnWhenUnsavedChangesChange={jest.fn()}
            />,
        );

        getByTestId("");
    });
});
