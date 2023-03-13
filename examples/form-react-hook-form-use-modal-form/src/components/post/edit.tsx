import { HttpError } from "@refinedev/core";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { Modal } from "components/modal";
import { IPost } from "interfaces";

export const EditPost: React.FC<
    UseModalFormReturnType<IPost, HttpError, IPost>
> = ({
    register,
    formState: { errors },
    refineCore: { onFinish, formLoading },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
}) => {
    return (
        <Modal isOpen={visible} onClose={close}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        {...register("title", {
                            required: "This field is required",
                        })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <select {...register("status")}>
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea
                        {...register("content", {
                            required: "This field is required",
                        })}
                        rows={10}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>
                <button type="submit" {...saveButtonProps}>
                    {formLoading ? "Loading" : "Save"}
                </button>
            </form>
        </Modal>
    );
};
