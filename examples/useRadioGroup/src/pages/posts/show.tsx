import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    MarkdownField,
    useOne,
} from "@pankod/refine";

import { IPost, ILanguage } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: languageData, isLoading: languageIsLoading } =
        useOne<ILanguage>("languages", record?.language);

    return (
        <Show {...props} isLoading={isLoading && languageIsLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record.title}</Text>

                    <Title level={5}>Tags</Title>
                    <Text>{languageData?.data.title}</Text>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Content
                    </Title>
                    <MarkdownField value={record.content} />
                </>
            )}
        </Show>
    );
};
