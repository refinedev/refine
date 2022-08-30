import { Box, Stack, TextInput, Textarea } from "@pankod/refine-mantine";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { FC } from "react";
import { PostForm } from "../../interfaces";

interface IPostForm {
    onSubmit: (data: PostForm) => void;
}

const PostFormFields: FC<IPostForm> = ({ onSubmit }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useFormContext<PostForm>();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={24}>
            <Stack>
                <TextInput
                    placeholder="Title"
                    label="Title"
                    error={errors?.title?.message}
                    {...register("title", { required: true })}
                />
                <Textarea
                    placeholder="Content"
                    label="Content"
                    error={errors?.content?.message}
                    maxRows={10}
                    autosize
                    {...register("content", { required: true })}
                />
            </Stack>
        </Box>
    );
};

export default PostFormFields;
