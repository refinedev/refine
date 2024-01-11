import React from "react";
import dedent from "dedent";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            files={{
                "App.tsx": {
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

export const ChangeAppTsxSpan = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { sandpack } = useSandpack();

    const onClick = () => {
        sandpack.updateFile(
            "App.tsx",
            `
export default function App(): JSX.Element {
    return <h1>Hello alisko!</h1>
}
`.trim(),
        );
    };

    return (
        <span
            onClick={onClick}
            className="text-refine-react-light-link dark:text-refine-react-dark-link cursor-pointer"
        >
            {children}
        </span>
    );
};

export const AddFileSpan = ({ children }: { children: React.ReactNode }) => {
    const { sandpack } = useSandpack();

    const onClick = () => {
        // sandpack.
        sandpack.addFile({
            "/my-component.tsx": {
                hidden: true,
                code: `
export default function MyComponent(): JSX.Element {
    return <h1>This is my component!</h1>
}
                    `.trim(),
            },
        });
    };

    return (
        <span
            onClick={onClick}
            className="text-refine-react-light-link dark:text-refine-react-dark-link cursor-pointer [&>p]:!text-red-500"
        >
            {children}
        </span>
    );
};

export const UpdateFileSpan = ({ children }: { children: React.ReactNode }) => {
    const { sandpack } = useSandpack();

    const onClick = () => {
        // sandpack.
        sandpack.updateFile({
            "/my-component.tsx": {
                active: true,
                hidden: false,
                code: dedent`
export default function MyComponent(): JSX.Element {
    return <h1>This is my component!</h1>
}
                    `.trim(),
            },
        });
        sandpack.visibleFiles;
        console.log(sandpack.visibleFiles);
        sandpack.openFile("/my-component.tsx");
    };

    return (
        <span
            onClick={onClick}
            className="text-refine-react-light-link dark:text-refine-react-dark-link cursor-pointer [&>p]:!text-red-500"
        >
            {children}
        </span>
    );
};
