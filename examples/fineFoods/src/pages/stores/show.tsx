import {
    useShow,
    Show,
    Typography,
    BooleanField,
    DateField,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine";

import { IStore } from "interfaces";

const { Title, Text } = Typography;

export const StoreShow: React.FC<IResourceComponentsProps> = (props) => {
    const t = useTranslate();
    const { queryResult } = useShow<IStore>();
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
                <Title level={5}>{t("stores:fields.createdAt")}</Title>
                <Text>
                    <DateField value={record.createdAt} format="LLL" />
                </Text>
            </>
        );
    };

    return (
        <Show {...props} title={t("stores:show.title")} isLoading={isLoading}>
            {record && renderContent()}
        </Show>
    );
};
