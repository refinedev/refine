import { createFormContext } from "@mantine/form";

const [FormProvider, useFormContext, useForm] = createFormContext();

export const FormContext = { FormProvider, useFormContext, useForm };
