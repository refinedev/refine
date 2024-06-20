import type { HttpError } from "@refinedev/core";

import { useSimpleList, List, useModalForm } from "@refinedev/antd";

import { List as AntdList } from "antd";

import type { ICompany } from "interfaces";
import { CompanyItem, CreateCompany, EditCompany } from "@/components/company";

export const CompanyList = () => {
  const { listProps } = useSimpleList<ICompany>({
    metaData: { populate: ["logo"] },
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "create",
    metaData: { populate: ["logo"] },
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "edit",
    metaData: { populate: ["logo"] },
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <AntdList
          grid={{ gutter: 16 }}
          {...listProps}
          renderItem={(item) => (
            <AntdList.Item>
              <CompanyItem item={item} editShow={editShow} />
            </AntdList.Item>
          )}
        />
      </List>
      <CreateCompany
        modalProps={createModalProps}
        formProps={createFormProps}
      />
      <EditCompany modalProps={editModalProps} formProps={editFormProps} />
    </>
  );
};
