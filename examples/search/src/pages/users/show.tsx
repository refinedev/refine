import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    TagField,
} from "@pankod/refine";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow<IUser>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show {...props} isLoading={isLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>Status</Title>
                    <Text>
                        <TagField value={record.status} />
                    </Text>

                    <Title level={5}>First Name</Title>
                    <Text>{record.firstName}</Text>

                    <Title level={5}>Last Name</Title>
                    <Text>{record.lastName}</Text>

                    <Title level={5}>Email</Title>
                    <Text>{record.email}</Text>
                </>
            )}
        </Show>
    );
};
