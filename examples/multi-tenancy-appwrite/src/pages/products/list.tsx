import {
    IResourceComponentsProps,
    HttpError,
    useParsed,
} from "@refinedev/core";

import {
    useSimpleList,
    useModalForm,
    CreateButton,
    List,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import { IProduct } from "interfaces";
import { ProductItem, EditProduct, CreateProduct } from "components/product";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant?: string }>();
    const { listProps } = useSimpleList<IProduct>({
        filters: {
            permanent: [
                {
                    field: "storeId",
                    operator: "eq",
                    value: params?.tenant,
                },
            ],
        },
    });

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        resource: "products",
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
                modalProps={createModalProps}
                formProps={createFormProps}
            />
        </>
    );
};
