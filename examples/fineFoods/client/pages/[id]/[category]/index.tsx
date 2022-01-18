import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { LayoutWrapper, GetListResponse } from "@pankod/refine-core";
import { Card, Typography, useSimpleList, AntdList } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";

import { API_URL } from "../../../src/constants";
import { ProductListCard } from "@components";
import { ICategory, IProduct } from "@interfaces";

const { Title } = Typography;

type CategoryPageProps = {
    category: ICategory;
    products: GetListResponse<IProduct>;
};

const Category: React.FC<CategoryPageProps> = ({ category, products }) => {
    const { query } = useRouter();
    const { id } = query;

    const { listProps } = useSimpleList<IProduct>({
        resource: "products",
        queryOptions: {
            initialData: products,
        },
        pagination: {
            pageSize: 6,
        },
        permanentFilter: [
            {
                field: "category.id",
                operator: "eq",
                value: id,
            },
        ],
    });

    return (
        <LayoutWrapper>
            <Card
                className="image-card"
                bordered={false}
                headStyle={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${category.cover})`,
                }}
                title={<Title className="head-title">{category.title}</Title>}
            >
                <AntdList
                    {...listProps}
                    itemLayout="vertical"
                    renderItem={(item) => <ProductListCard product={item} />}
                />
            </Card>
        </LayoutWrapper>
    );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    try {
        const { data: categoryData } = await dataProvider(API_URL).getOne({
            resource: "categories",
            id: id as string,
        });

        const productData = await dataProvider(API_URL).getList({
            resource: "products",
            pagination: {
                pageSize: 6,
            },
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: id,
                },
            ],
        });

        return {
            props: { category: categoryData, products: productData },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};
