import { useForm, FormProvider } from "@pankod/refine-react-hook-form";
import { Edit, LoadingOverlay } from "@pankod/refine-mantine";
import { HttpError } from "@pankod/refine-core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Post, PostForm } from "../../interfaces";
import PostFormFields from "./formFields";

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
});

export const PostEdit = () => {
    const {
        refineCore: { onFinish, formLoading },
        ...methods
    } = useForm<Post, HttpError, PostForm>({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data: PostForm) => {
        onFinish(data);
    };

    return (
        <Edit
            canDelete
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
        </Edit>
    );
};
