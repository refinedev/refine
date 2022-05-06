import { useNavigation } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import { ErrorList } from "components/Error";
import { useState } from "react";

export const EditorPage: React.FC = () => {
    const { push } = useNavigation();

    const [tags, setTags] = useState<string[]>([]);

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        refineCoreProps: {
            resource: "articles",
            redirect: false,
            onMutationError: (error) => {
                setError("api", error?.response?.data.errors);
            },
            onMutationSuccess: (response) => {
                push(`/article/${response.data.article.slug}`);
            },
        },
    });

    const onSubmit = (data: any) => {
        onFinish({ article: { ...data, tagList: tags } });
    };

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {errors.api && <ErrorList errors={errors.api} />}
                        <form>
                            <fieldset disabled={formLoading}>
                                <fieldset className="form-group">
                                    <input
                                        {...register("title", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
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
                                    ></textarea>
                                    {errors.body && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        onKeyUp={(e: any) => {
                                            e.preventDefault();
                                            if (e.key === "Enter") {
                                                const value = e.target.value;
                                                if (!tags.includes(value)) {
                                                    setTags([...tags, value]);
                                                    e.target.value = "";
                                                }
                                            }
                                        }}
                                    />
                                    <div className="tag-list">
                                        {tags.map((item) => {
                                            return (
                                                <span
                                                    key={item}
                                                    className="tag-default tag-pill"
                                                >
                                                    <i
                                                        className="ion-close-round"
                                                        onClick={() => {
                                                            setTags(
                                                                tags.filter(
                                                                    (tag) =>
                                                                        tag !==
                                                                        item,
                                                                ),
                                                            );
                                                        }}
                                                    ></i>
                                                    {item}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </fieldset>
                                <button
                                    className="btn btn-lg pull-xs-right btn-primary"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        clearErrors();
                                        handleSubmit(onSubmit)();
                                    }}
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
