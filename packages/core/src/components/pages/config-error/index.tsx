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
                        maxWidth: "400px",
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
                            is not initialized. Please check your configuration.
                        </p>
                        <p style={{ marginBottom: 0 }}>
                            To learn more about this error, please visit{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://refine.dev/docs"
                                style={{
                                    color: "#149ECA",
                                }}
                            >
                                Refine Documentation
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
