import { FC, PropsWithChildren } from "react";

import { QuotesFormModal } from "./components";

export const QuotesCreatePage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <QuotesFormModal action="create" />
            {children}
        </>
    );
};
