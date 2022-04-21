import { useContext } from "react";
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
    useSimpleList,
    AntdList,
    useModalForm,
    useDrawerForm,
    CreateButton,
    List,
} from "@pankod/refine-antd";

import { IProduct } from "interfaces";
import { ProductItem, EditProduct, CreateProduct } from "components/product";
import { StoreContext } from "context/store";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const [store] = useContext(StoreContext);
    const { listProps } = useSimpleList<IProduct>({
        permanentFilter: [{ field: "storeId", operator: "eq", value: store }],
    });

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IProduct, HttpError, IProduct>({
        action: "create",
        resource: "61cb01b17ef57",
        redirect: false,
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IProduct, HttpError>({
        action: "edit",
        queryOptions: {
            select: ({ data }) => {
                return {
                    data: {
                        ...data,
                        image: data.image ? JSON.parse(data.image) : undefined,
                    },
                };
            },
        },
    });

    return (
        <>
            <List
                pageHeaderProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <ProductItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <EditProduct
                modalProps={editModalProps}
                formProps={editFormProps}
            />
            <CreateProduct
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
        </>
    );
};
