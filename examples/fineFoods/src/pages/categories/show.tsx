import {
    useShow,
    Show,
    Typography,
    BooleanField,
    DateField,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine";

import { ICategory } from "interfaces";

const { Title, Text } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { queryResult } = useShow<ICategory>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const renderContent = () => {
        return (
            <>
                <Title level={5}>{t("stores:fields.id")}</Title>
                <Text>{record.id}</Text>
                <Title level={5}>{t("stores:fields.title")}</Title>
                <Text>{record.title}</Text>
                <Title level={5}>{t("stores:fields.isActive")}</Title>
                <Text>
                    <BooleanField value={record.isActive} />
                </Text>
            </>
        );
    };

    return (
        <Show {...props} title="Store Detail" isLoading={isLoading}>
            {record && renderContent()}
        </Show>
    );
};
