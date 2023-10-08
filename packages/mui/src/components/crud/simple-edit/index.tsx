import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import { useUpdate } from "../../../../../core";
import { Edit } from "../edit";
import { FormProvider } from "../../useFormContext";
import { Type } from "../types";

export const EditPage: React.FC<{
    fields: React.FC<{ type: Type; row: any }>;
}> = (props) => {
    const { fields: Fields } = props;
    const form = useForm();
    const { isLoading } = useUpdate();
    const { saveButtonProps } = form;

    return (
        <Edit isLoading={isLoading} saveButtonProps={saveButtonProps}>
            <FormProvider {...form} resource="orders">
                <Stack gap={2}>
                    <Fields
                        type="edit"
                        row={form.refineCore.queryResult?.data?.data}
                    />
                </Stack>
            </FormProvider>
        </Edit>
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
//     path: 'new',
//     element: <CreatePage fields={OrderFields} />,
//   },
