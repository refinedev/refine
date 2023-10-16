import dynamic from "next/dynamic";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false },
);

export const MarkdownEditor = () => {
    return <MDEditor preview="edit" data-color-mode="light" height={250} />;
};
