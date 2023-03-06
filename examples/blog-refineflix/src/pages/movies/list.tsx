import {
    IResourceComponentsProps,
    useList,
    useNavigation,
} from "@refinedev/core";
import { Card, Space } from "antd";
import { Layout } from "components";

import { IMovies } from "interfaces";

export const MoviesList: React.FC<IResourceComponentsProps> = () => {
    const { Meta } = Card;

    const { data, isLoading } = useList<IMovies>({
        resource: "movies",
        queryOptions: {
            staleTime: 0,
        },
    });

    const { push } = useNavigation();

    const renderMovies = () => {
        if (data) {
            return data.data.map((movie) => {
                return (
                    <Card
                        hoverable
                        key={movie.name}
                        style={{ width: 240, minHeight: 400 }}
                        cover={
                            movie.images?.length > 0 ? (
                                <img
                                    alt={movie.images[0].name}
                                    src={movie.images[0].url}
                                />
                            ) : (
                                <img
                                    alt="default"
                                    src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg"
                                />
                            )
                        }
                        loading={isLoading}
                        onClick={() => push(`/movies/show/${movie.id}`)}
                    >
                        <Meta
                            title={movie.name}
                            description={movie.description}
                        />
                    </Card>
                );
            });
        }
    };

    return (
        <Layout>
            <Space align="start">{renderMovies()}</Space>
        </Layout>
    );
};
