import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
} from "@pankod/refine-core";

import {
    Show,
    Typography,
    Space,
    ImageField,
    RefreshButton,
    EditButton,
} from "@pankod/refine-antd";

import { IMovies } from "interfaces";

const { Title, Text } = Typography;

export const AdminMovieShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IMovies>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { push } = useNavigation();

    return (
        <Show
            isLoading={isLoading}
            pageHeaderProps={{
                title: record?.name,
                subTitle: record?.premiere,
                extra: (
                    <>
                        <EditButton
                            onClick={() =>
                                push(`/admin/movies/edit/${record?.id}`)
                            }
                        />
                        <RefreshButton />
                    </>
                ),
            }}
        >
            <Title level={5}>Director</Title>
            <Text>{record?.director || "-"}</Text>

            <Title level={5}>Stars</Title>
            <Text>{record?.stars || "-"}</Text>

            <Title level={5}>Trailer</Title>
            {record?.trailer && (
                <video width="400" controls>
                    <source src={record.trailer} type="video/mp4" />
                </video>
            )}

            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    record.images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </Show>
    );
};
