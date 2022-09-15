import { FormProvider, useForm } from "@pankod/refine-react-hook-form";
import { Create, LoadingOverlay } from "@pankod/refine-mantine";
import { HttpError } from "@pankod/refine-core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Post } from "../../interfaces";
import PostFormFields from "./formFields";

type PostForm = Pick<Post, "title" | "content">;

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
});

export const PostCreate = () => {
    const {
        refineCore: { onFinish, formLoading },
        ...methods
    } = useForm<Post, HttpError, PostForm>({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (e: any) => {
        onFinish(e);
    };

    return (
        <Create
            breadcrumb={null}
            isLoading={formLoading}
            saveButtonProps={{
                onClick: methods.handleSubmit(onSubmitHandler),
                leftIcon: null,
            }}
        >
            <LoadingOverlay visible={formLoading} overlayBlur={0.1} />
            <FormProvider {...methods}>
                <PostFormFields onSubmit={onSubmitHandler} />
            </FormProvider>
        </Create>
    );
};
