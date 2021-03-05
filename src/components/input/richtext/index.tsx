import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Richtext: React.FC<any> = ({ ...rest }) => (
    <ReactQuill theme="snow" {...rest} />
);
