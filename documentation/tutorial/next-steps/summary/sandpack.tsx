import React from "react";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

import { finalFiles as initialFiles } from "@site/tutorial/next-steps/devtools/react-router/sandpack";
import { dependencies } from "@site/tutorial/next-steps/intro/ant-design/sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef<FireworksHandlers>(null);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            ref.current?.waitStop();
        }, 8000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <TutorialSandpack
                showNavigator
                dependencies={dependencies}
                files={initialFiles}
                finalFiles={finalFiles}
                previewOnly
            >
                {children}
            </TutorialSandpack>
            <Fireworks
                ref={ref}
                autostart={true}
                options={{
                    intensity: 38,
                    explosion: 8,
                }}
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    zIndex: 99999,
                    pointerEvents: "none",
                }}
            />
        </>
    );
};

export const finalFiles = initialFiles;
