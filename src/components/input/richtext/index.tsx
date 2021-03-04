import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Richtext: React.FC = () => {
    const [value, setValue] = React.useState("");
    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};
