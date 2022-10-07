import { createFormContext } from "@mantine/form";

export const useCreateFormContext = <TForm>() => {
    const [FormProvider, useFormContext, useForm] = createFormContext<TForm>();

    return { FormProvider, useFormContext, useForm };
};
