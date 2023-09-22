import { FC, PropsWithChildren } from "react";

import { QuotesFormModal } from "./components";

export const QuotesEditPage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <QuotesFormModal action="edit" />
            {children}
        </>
    );
};
