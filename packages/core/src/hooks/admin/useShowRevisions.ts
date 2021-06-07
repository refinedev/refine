import { useContext } from "react";

import { AdminContext } from "@contexts/admin";
import { IAdminContext } from "src/interfaces";

type UseShowRevisionsType = () => {
    showRevisions: IAdminContext["showRevisions"];
};

export const useShowRevisions: UseShowRevisionsType = () => {
    const { showRevisions } = useContext(AdminContext);

    return { showRevisions };
};
