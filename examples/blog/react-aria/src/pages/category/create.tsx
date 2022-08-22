import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { HttpError } from "@pankod/refine-core";
import { useOverlayTriggerState } from "@react-stately/overlays";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

export const CategoryCreate: React.FC = () => {
    const state = useOverlayTriggerState({});

    const {
        refineCore: { onFinish },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ title: string }, HttpError, { title: string }>({
        refineCoreProps: {
            onMutationSuccess: () => {
                state.close();
            },
        },
    });

    return (
        <div className="container">
            <div className="w-full flex justify-end">
                <Button onPress={state.open}>Create</Button>
            </div>
            <Modal overlayState={state} title="Create a category">
                <form
                    onSubmit={handleSubmit(onFinish)}
                    className="w-full flex flex-col gap-4"
                >
                    <Controller
                        control={control}
                        name="title"
                        rules={{ required: "field is required" }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Title"
                                />
                                {errors?.title && (
                                    <div className="text-red-500 text-xs mt-1 font-semibold">
                                        {errors.title.message}
                                    </div>
                                )}
                            </>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};
