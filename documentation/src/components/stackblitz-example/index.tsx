import React from "react";

import ExampleSourcePrompt from "../example-source-prompt";
import ExampleLocalPrompt from "../example-local-prompt";

type Props = {
    path?: string;
    hideSource?: boolean;
    hideLocal?: boolean;
};

const StackblitzExample: React.FC<Props> = ({
    path,
    hideSource,
    hideLocal,
}) => {
    const STACKBLITZ_URL = `https://stackblitz.com/github/refinedev/refine/tree/master/examples/${path}`;

    const EDITOR_URL = `${STACKBLITZ_URL}?embed=1&view=preview&theme=dark&preset=node&ctl=1`;

    return (
        <div>
            {!hideSource && <ExampleSourcePrompt path={path} />}
            {!hideLocal && <ExampleLocalPrompt path={path} />}
            <iframe
                loading="lazy"
                src={EDITOR_URL}
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "0px",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
                title={path}
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
        </div>
    );
};

export default StackblitzExample;
