import { FC } from "react";

import { CompanyListPage } from "../list";
import { CompanyCreateModal } from "../list/create-modal";

export const CompanyCreatePage: FC = () => {
  return (
    <CompanyListPage>
      <CompanyCreateModal />
    </CompanyListPage>
  );
};
