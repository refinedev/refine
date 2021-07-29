import {
    useShow,
    Show,
    Typography,
    BooleanField,
    DateField,
    NumberField,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine";

import { IProduct } from "interfaces";

const { Title, Text } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { queryResult } = useShow<IProduct>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    const renderContent = () => {
        return (
            <>
                <Title level={5}>{t("products:fields.id")}</Title>
                <Text>{record?.id}</Text>
                <Title level={5}>{t("products:fields.name")}</Title>
                <Text>{record?.name}</Text>
                <Title level={5}>{t("products:fields.description")}</Title>
                <Text>{record?.description}</Text>
                <Title level={5}>{t("products:fields.price")}</Title>
                <Text>
                    <NumberField
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={record?.price || 0}
                    />
                </Text>
                <Title level={5}>{t("products:fields.category")}</Title>
                <Text>{record?.category.title}</Text>
                <Title level={5}>{t("products:fields.isActive")}</Title>
                <Text>
                    <BooleanField value={record?.isActive} />
                </Text>
                <Title level={5}>{t("products:fields.createdAt")}</Title>
                <Text>
                    <DateField value={record?.createdAt || ""} format="LLL" />
                </Text>
            </>
        );
    };

    return (
        <Show title={t("products:show.title")} isLoading={isFetching}>
            {record && renderContent()}
        </Show>
    );
};
