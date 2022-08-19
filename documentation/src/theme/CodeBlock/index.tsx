import React from "react";
import ReactLiveScope from "@theme/ReactLiveScope";
import CodeBlock from "@theme-init/CodeBlock";
import BrowserOnly from "@docusaurus/BrowserOnly";

const Playground = React.lazy(() => import("@theme/Playground"));

const withLiveEditor = (Component) => {
    function WrappedComponent(props) {
        if (props.live) {
            const previewHeight = props.previewHeight ?? "400px";
            return (
                <BrowserOnly>
                    {() => (
                        <React.Suspense
                            fallback={<div style={{ height: previewHeight }} />}
                        >
                            <Playground scope={ReactLiveScope} {...props} />
                        </React.Suspense>
                    )}
                </BrowserOnly>
            );
        }
        return <Component {...props} />;
    }
    return WrappedComponent;
};

export default withLiveEditor(CodeBlock);
