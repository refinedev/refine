import * as React from "react";

export const ShowAside: React.FC<{ record: any }> = ({ record }) => {
    console.log("record: ", record);
    return (
        <div
            style={{
                width: 200,
                paddingLeft: 30,
            }}
        >
            <p>{record?.title}</p>
            <p>{record?.slug}</p>
            <p>{record?.status}</p>
            <p>{record?.content}</p>
        </div>
    );
};
