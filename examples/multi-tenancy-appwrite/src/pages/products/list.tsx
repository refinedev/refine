import { IResourceComponentsProps, HttpError } from "@refinedev/core";

import {
    useSimpleList,
    useModalForm,
    useDrawerForm,
    CreateButton,
    List,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import { IProduct } from "interfaces";
import { ProductItem, EditProduct, CreateProduct } from "components/product";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { listProps } = useSimpleList<IProduct>();

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IProduct, HttpError, IProduct>({
        action: "create",
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
                headerProps={{
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
