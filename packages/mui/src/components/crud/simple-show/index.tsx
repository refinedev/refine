import React from "react";
import { useShow } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import { Show } from "../show";
import { FormProvider } from "../../useFormContext";
import { Type } from "../types";

export const ShowPage: React.FC<{
    fields: React.FC<{ type: Type; row: any }>;
}> = (props) => {
    const { fields: Fields } = props;
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const form = useForm({ values: data?.data });

    return (
        <Show isLoading={isLoading}>
            <FormProvider {...form} resource="orders" show>
                <Stack gap={2}>
                    <Fields
                        type="show"
                        row={form.refineCore.queryResult?.data?.data}
                    />
                </Stack>
            </FormProvider>
        </Show>
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
//     path: ':id',
//     element: <ShowPage fields={OrderFields} />,
//   },
