import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        // <form onSubmit={handleSubmit(onFinish)}>
        //     <label>Title: </label>
        //     <input {...register("title", { required: true })} />
        //     {errors.title && <span>This field is required</span>}
        //     <br />
        //     <label>Status: </label>
        //     <select {...register("status")}>
        //         <option value="published">published</option>
        //         <option value="draft">draft</option>
        //         <option value="rejected">rejected</option>
        //     </select>
        //     <br />
        //     <label>Category: </label>
        //     <select
        //         defaultValue={""}
        //         {...register("category.id", { required: true })}
        //     >
        //         <option value={""} disabled>
        //             Please select
        //         </option>
        //         {options?.map((category) => (
        //             <option key={category.value} value={category.value}>
        //                 {category.label}
        //             </option>
        //         ))}
        //     </select>
        //     {errors.category && <span>This field is required</span>}
        //     <br />
        //     <label>Content: </label>
        //     <br />
        //     <textarea
        //         {...register("content", { required: true })}
        //         rows={10}
        //         cols={50}
        //     />
        //     {errors.content && <span>This field is required</span>}
        //     <br />
        //     <input type="submit" value="Submit" />
        //     {formLoading && <p>Loading</p>}
        // </form>
        <div className="container mx-auto">
            <br />
            <form onSubmit={handleSubmit(onFinish)}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        id="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        required
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> This
                            field is required
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="status"
                        className="mb-2 block text-sm font-medium"
                    >
                        Status
                    </label>
                    <select
                        {...register("status")}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    >
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium"
                    >
                        Category
                    </label>
                    <select
                        defaultValue={""}
                        {...register("category.id", { required: true })}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    >
                        <option value={""} disabled>
                            Please select
                        </option>
                        {options?.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> This
                            field is required
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        {...register("content", { required: true })}
                        id="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        rows={10}
                        required
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> This
                            field is required
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    Create
                </button>
                {formLoading && <p>Loading</p>}
            </form>
        </div>
    );
};
