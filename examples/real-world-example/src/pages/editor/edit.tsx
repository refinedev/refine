import { useNavigation, useOne } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import routerProvider from "@pankod/refine-react-router-v6";
import { IArticle } from "interfaces";

const { useParams } = routerProvider;

export const EditArticlePage: React.FC = () => {
    const { push } = useNavigation();
    const params = useParams();

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        refineCoreProps: {
            resource: `articles/${params?.slug}`,
            action: "edit",
        },
    });

    const defaultValue = useOne<IArticle>({
        resource: "articles",
        id: params?.slug,
        metaData: {
            resource: "article",
        },
    });

    const onSubmit = async (data: any) => {
        await onFinish({ article: data });
        push("/");
    };

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("title", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        defaultValue={
                                            defaultValue?.data?.data?.title
                                        }
                                    />
                                    {errors.title && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("description", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        defaultValue={
                                            defaultValue.data?.data?.description
                                        }
                                    />
                                    {errors.description && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        {...register("body", {
                                            required: true,
                                        })}
                                        className="form-control"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                        defaultValue={
                                            defaultValue.data?.data?.body
                                        }
                                    ></textarea>
                                    {errors.body && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("tagList")}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                    />
                                    <div className="tag-list"></div>
                                </fieldset>
                                <button
                                    className="btn btn-lg pull-xs-right btn-primary"
                                    type="submit"
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                            {formLoading && <p>Loading</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
