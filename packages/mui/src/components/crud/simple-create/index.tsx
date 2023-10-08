import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "../create";
import Stack from "@mui/material/Stack";
import { FormProvider } from "../../useFormContext";
import { Type } from "../types";

export const CreatePage: React.FC<{ fields: React.FC<{ type: Type }> }> = (
    props,
) => {
    const { fields: Fields } = props;
    const form = useForm();
    const { saveButtonProps } = form;

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormProvider {...form} resource="orders">
                <Stack gap={2}>
                    <Fields type="create" />
                </Stack>
            </FormProvider>
        </Create>
    );
};

// Example:

// /pages/orders/index.tsx

// export const OrderFields: React.FC<{ type: Type }> = ({ type }) => (
//     <>
//       <TextInput name="description" />
//       <RelationInput
//         name="owner"
//         relation="users"
//         searchIn={['firstname', 'lastname']}
//         getOptionLabel={(row) => `${row.firstname} ${row.lastname}`}
//       />
//       <RelationInput
//         name="customer"
//         relation="users"
//         searchIn={['firstname', 'lastname']}
//         getOptionLabel={(row) => `${row.firstname} ${row.lastname}`}
//       />
//       <RelationInput
//         name="executor"
//         relation="users"
//         searchIn={['firstname', 'lastname']}
//         getOptionLabel={(row) => `${row.firstname} ${row.lastname}`}
//       />
//       <TextInput name="deposit" />
//       <TextInput name="executorTime" />
//       <TextInput name="executorDeadline" />
//       <TextInput name="depositFrozen" />
//     </>
//   );

// //App.tsx
//   {
//     path: ':id/edit',
//     element: <EditPage fields={OrderFields} />,
//   },
