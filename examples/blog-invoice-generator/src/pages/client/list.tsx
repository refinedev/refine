import { HttpError, IResourceComponentsProps } from "@refinedev/core";

import {
    CreateButton,
    List,
    useDrawerForm,
    useSimpleList,
} from "@refinedev/antd";

import { List as AntdList } from "antd";

import { ClientItem, CreateClient, EditClient } from "components/client";
import { IClient } from "interfaces";
import { useState } from "react";

export const ClientList: React.FC<IResourceComponentsProps> = () => {
    const [currentClient, setCurrentClient] = useState<IClient>();

    const { listProps } = useSimpleList<IClient>({
        meta: { populate: ["contacts"] },
    });

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IClient, HttpError, IClient>({
        action: "create",
        resource: "clients",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editClientDrawerFrom,
    } = useDrawerForm<IClient, HttpError, IClient>({
        action: "edit",
        resource: "clients",
        redirect: false,
        meta: {
            populate: ["contacts"],
        },
    });

    const editShow = (item: IClient) => {
        setCurrentClient(item);
        editClientDrawerFrom(item?.id);
    };

    return (
        <>
            <List
                headerProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 24, xs: 1 }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <ClientItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <CreateClient
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditClient
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                currentClient={currentClient as any}
                saveButtonProps={editSaveButtonProps}
            />
        </>
    );
};
