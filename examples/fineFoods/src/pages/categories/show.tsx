import {
    useShow,
    Show,
    Typography,
    BooleanField,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine";

import { ICategory } from "interfaces";

const { Title, Text } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { queryResult } = useShow<ICategory>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    const renderContent = () => {
        return (
            <>
                <Title level={5}>{t("categories:fields.id")}</Title>
                <Text>{record?.id}</Text>
                <Title level={5}>{t("categories:fields.title")}</Title>
                <Text>{record?.title}</Text>
                <Title level={5}>{t("categories:fields.isActive")}</Title>
                <Text>
                    <BooleanField value={record?.isActive} />
                </Text>
            </>
        );
    };

    return (
        <Show title={t("categories:show.title")} isLoading={isFetching}>
            {record && renderContent()}
        </Show>
    );
};
