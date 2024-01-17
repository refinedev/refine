import React from "react";

export const ConfigErrorPage = () => {
    return (
        <div
            style={{
                position: "fixed",
                zIndex: 10,
                inset: 0,
                overflow: "auto",
                width: "100dvw",
                height: "100dvh",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    background: "rgb(0 0 0 / 25%)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div
                    style={{
                        maxWidth: "500px",
                        width: "100%",
                        background: "rgb(52 58 70 / 100%)",
                        borderRadius: "8px",
                        border: "1px solid rgb(102 112 132 / 100%)",
                    }}
                >
                    <div
                        style={{
                            padding: "8px 16px",
                            borderBottom: "1px solid rgb(102 112 132 / 100%)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <RefineLogo
                            style={{
                                width: "20px",
                                height: "20px",
                                color: "rgb(246 247 249)",
                            }}
                        />{" "}
                        <span
                            style={{
                                lineHeight: "24px",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "rgb(246 247 249)",
                            }}
                        >
                            Configuration Error
                        </span>
                    </div>
                    <div
                        style={{
                            padding: "16px 16px",
                            color: "rgb(246 247 249)",
                            lineHeight: "20px",
                            fontSize: "14px",
                        }}
                    >
                        <p>
                            <code
                                style={{
                                    background: "rgb(68 73 85)",
                                    padding: "2px 4px",
                                    lineHeight: "20px",
                                    fontSize: "14px",
                                    borderRadius: "4px",
                                }}
                            >{`<Refine />`}</code>{" "}
                            is not initialized. Please make sure you have it
                            mounted in your app and placed your components
                            inside it.
                        </p>
                        <div>
                            <ExampleImplementation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExampleImplementation = () => {
    return (
        <pre
            style={{
                display: "block",
                overflowX: "auto",
                borderRadius: "8px",
                fontSize: "12px",
                backgroundColor: "rgb(29, 31, 33)",
                color: "rgb(197, 200, 198)",
                padding: "0.5em",
            }}
        >
            <span style={{ color: "rgb(178, 148, 187)" }}>import</span> {"{"}{" "}
            Refine, WelcomePage {"}"}{" "}
            <span style={{ color: "rgb(178, 148, 187)" }}>from</span>{" "}
            <span style={{ color: "rgb(181, 189, 104)" }}>
                {'"@refinedev/core"'}
            </span>
            ;{"\n"}
            {"\n"}
            <span style={{ color: "rgb(178, 148, 187)" }}>export</span>{" "}
            <span style={{ color: "rgb(178, 148, 187)" }}>default</span>{" "}
            <span>
                <span style={{ color: "rgb(178, 148, 187)" }}>function</span>{" "}
                <span style={{ color: "rgb(129, 162, 190)" }}>App</span>
                (
                <span style={{ color: "rgb(222, 147, 95)" }} />){" "}
            </span>
            {"{"}
            {"\n"}
            {"  "}
            <span style={{ color: "rgb(178, 148, 187)" }}>return</span> ({"\n"}
            {"    "}
            <span>
                <span style={{ color: "rgb(204, 102, 102)" }}>
                    &lt;
                    <span style={{ color: "rgb(204, 102, 102)" }}>Refine</span>
                    {"\n"}
                    {"      "}
                    {"// "}
                    <span>...</span>
                    {"\n"}
                    {"    "}&gt;
                </span>
                {"\n"}
                {"      "}
                {"{"}
                {"/* ... */"}
                {"}"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(204, 102, 102)" }}>
                    &lt;
                    <span style={{ color: "rgb(204, 102, 102)" }}>
                        WelcomePage
                    </span>{" "}
                    /&gt;
                </span>
                {"\n"}
                {"      "}
                {"{"}
                {"/* ... */"}
                {"}"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(204, 102, 102)" }}>
                    &lt;/
                    <span style={{ color: "rgb(204, 102, 102)" }}>Refine</span>
                    &gt;
                </span>
            </span>
            {"\n"}
            {"  "});{"\n"}
            {"}"}
        </pre>
    );
};

const RefineLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <g fill="currentColor">
            <path
                fillRule="evenodd"
                d="M13.789.422a4 4 0 0 0-3.578 0l-8 4A4 4 0 0 0 0 8v8a4 4 0 0 0 2.211 3.578l8 4a4 4 0 0 0 3.578 0l8-4A4 4 0 0 0 24 16V8a4 4 0 0 0-2.211-3.578l-8-4ZM8 8a4 4 0 1 1 8 0v8a4 4 0 0 1-8 0V8Z"
                clipRule="evenodd"
            />
            <path d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        </g>
    </svg>
);
