import {
    useShow,
    Show,
    Typography,
    BooleanField,
    DateField,
    Avatar,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { queryResult } = useShow<IUser>();
    const { data, isFetching } = queryResult;
    const record = data?.data;

    const renderContent = () => {
        return (
            <>
                <Title level={5}>{t("users:fields.id")}</Title>
                <Text>{record.id}</Text>
                <Title level={5}>{t("users:fields.firstName")}</Title>
                <Text>{record.firstName}</Text>
                <Title level={5}>{t("users:fields.lastName")}</Title>
                <Text>{record.lastName}</Text>
                <Title level={5}>{t("users:fields.gender")}</Title>
                <Text>{record.gender}</Text>
                <Title level={5}>{t("users:fields.gsm")}</Title>
                <Text>{record.gsm}</Text>
                <Title level={5}>{t("users:fields.avatar.label")}</Title>
                <Text>
                    <Avatar src={record.avatar[0].url} />
                </Text>
                <Title level={5}>{t("users:fields.isActive")}</Title>
                <Text>
                    <BooleanField value={record.isActive} />
                </Text>
                <Title level={5}>{t("users:fields.createdAt")}</Title>
                <Text>
                    <DateField value={record.createdAt} format="LLL" />
                </Text>
            </>
        );
    };

    return (
        <Show title={t("users:show.title")} isLoading={isFetching}>
            {record && renderContent()}
        </Show>
    );
};
