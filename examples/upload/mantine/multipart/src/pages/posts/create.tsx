import { useEffect, useState } from "react";
import axios from "axios";
import { BaseKey, HttpError, useApiUrl } from "@pankod/refine-core";
import {
    Create,
    Select,
    TextInput,
    useForm,
    useSelect,
    RichTextEditor,
    Text,
    SimpleGrid,
    Image,
} from "@pankod/refine-mantine";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

import { IPost } from "../../interfaces";

interface FormValues {
    title: string;
    status: string;
    category: {
        id: BaseKey;
    };
    content: string;
    images: FileWithURL[];
}

interface FileWithURL extends FileWithPath {
    url?: string;
}

export const PostCreate: React.FC = () => {
    const [files, setFiles] = useState<FileWithURL[]>([]);
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { saveButtonProps, getInputProps, setFieldValue } = useForm<
        IPost,
        HttpError,
        FormValues
    >({
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
            images: [],
        },
    });

    const { selectProps } = useSelect({
        resource: "categories",
    });

    const previews = files.map((file, index) => {
        return <Image key={index} src={file.url} />;
    });
    const apiUrl = useApiUrl();

    const handleOnDrop = (files: FileWithPath[]) => {
        try {
            setIsUploadLoading(true);

            files.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);

                const res = await axios.post<{ url: string }>(
                    `${apiUrl}/media/upload`,
                    formData,
                    {
                        withCredentials: false,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    },
                );

                setFiles((prev) => [...prev, { url: res.data.url, ...file }]);
            });

            setIsUploadLoading(false);
        } catch (error) {
            setIsUploadLoading(false);
        }
    };

    useEffect(() => {
        setFieldValue("images", files);
    }, [files]);

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <TextInput
                    mt={8}
                    label="Title"
                    placeholder="Title"
                    {...getInputProps("title")}
                />
                <Select
                    mt={8}
                    label="Status"
                    placeholder="Pick one"
                    {...getInputProps("status")}
                    data={[
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                />
                <Select
                    mt={8}
                    label="Category"
                    placeholder="Pick one"
                    {...getInputProps("category.id")}
                    {...selectProps}
                />
                <Text mt={8} weight={500} size="sm" color="#212529">
                    Content
                </Text>
                <RichTextEditor {...getInputProps("content")} />

                <Text mt={8} weight={500} size="sm" color="#212529">
                    Images
                </Text>
                <Dropzone
                    accept={IMAGE_MIME_TYPE}
                    onDrop={handleOnDrop}
                    loading={isUploadLoading}
                >
                    <Text align="center">Drop images here</Text>
                </Dropzone>

                <SimpleGrid
                    cols={4}
                    breakpoints={[{ maxWidth: "sm", cols: 2 }]}
                    mt={previews.length > 0 ? "xl" : 0}
                >
                    {previews}
                </SimpleGrid>
            </form>
        </Create>
    );
};
