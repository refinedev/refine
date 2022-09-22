import { BaseKey, HttpError } from "@pankod/refine-core";
import { useState } from "react";
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

import { convertBase64 } from "../../utils";
import { IPost } from "../../interfaces";

interface FormValues {
    title: string;
    status: string;
    category: {
        id: BaseKey;
    };
    content: string;
    images: string[];
}

export const PostCreate: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { saveButtonProps, getInputProps, setFieldValue, values } = useForm<
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

    const handleOnDrop = (files: FileWithPath[]) => {
        try {
            setIsUploadLoading(true);

            files.map(async (file) => {
                const base64 = await convertBase64(file);

                if (values.images) {
                    setFieldValue("images", [...values.images, base64]);
                } else {
                    setFieldValue("images", [base64]);
                }
            });

            setIsUploadLoading(false);
        } catch (error) {
            setIsUploadLoading(false);
        }
    };

    const previews = values.images?.map((base64, index) => {
        return <Image key={index} src={base64} />;
    });

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
                    mt={previews?.length > 0 ? "xl" : 0}
                >
                    {previews}
                </SimpleGrid>
            </form>
        </Create>
    );
};
