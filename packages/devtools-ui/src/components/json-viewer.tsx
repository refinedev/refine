import React from "react";
import ReactJson from "react-json-view";

export const JsonViewer = ({ data }: { data: any }) => {
    return (
        <ReactJson
            src={data}
            enableClipboard={false}
            displayDataTypes={false}
            theme="flat"
            style={{
                backgroundColor: "#303450",
                padding: "8px",
                borderRadius: "8px",
                overflow: "auto",
                maxHeight: "160px",
            }}
            collapsed={2}
            name={false}
        />
    );
};
