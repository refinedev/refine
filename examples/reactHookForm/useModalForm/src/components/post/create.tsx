import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";

import { Modal } from "../modal";

export const CreatePost: React.FC<UseModalFormReturnType> = ({
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
                    <input {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}
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
                        {...register("content", { required: true })}
                        rows={10}
                    />
                    {errors.content && <span>This field is required</span>}
                </div>

                <button type="submit" {...saveButtonProps}>
                    {formLoading ? "Loading" : "Save"}
                </button>
            </form>
        </Modal>
    );
};
