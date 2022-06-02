import { useStepsForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

const stepTitles = ["Title", "Status", "Content"];

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <label>Title: </label>
                        <input {...register("title", { required: true })} />
                        {errors.title && <span>This field is required</span>}
                    </>
                );
            case 1:
                return (
                    <>
                        <label>Status: </label>
                        <select {...register("status")}>
                            <option value="published">published</option>
                            <option value="draft">draft</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </>
                );
            case 2:
                return (
                    <>
                        <label>Category: </label>
                        <select
                            {...register("category.id", {
                                required: true,
                            })}
                            defaultValue={queryResult?.data?.data.category.id}
                        >
                            {options?.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <br />
                        <label>Content: </label>
                        <textarea
                            {...register("content", { required: true })}
                            rows={10}
                            cols={50}
                        />
                        {errors.content && <span>This field is required</span>}
                    </>
                );
        }
    };

    if (formLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 36 }}>
                {stepTitles.map((title, index) => (
                    <button
                        key={index}
                        onClick={() => gotoStep(index)}
                        style={{
                            backgroundColor:
                                currentStep === index ? "lightgray" : "initial",
                        }}
                    >
                        {index + 1} - {title}
                    </button>
                ))}
            </div>
            <form autoComplete="off">{renderFormByStep(currentStep)}</form>
            <div style={{ display: "flex", gap: 8 }}>
                {currentStep > 0 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep - 1);
                        }}
                    >
                        Previous
                    </button>
                )}
                {currentStep < stepTitles.length - 1 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep + 1);
                        }}
                    >
                        Next
                    </button>
                )}
                {currentStep === stepTitles.length - 1 && (
                    <button onClick={handleSubmit(onFinish)}>Save</button>
                )}
            </div>
        </div>
    );
};
