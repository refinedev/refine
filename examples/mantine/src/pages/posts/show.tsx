import { useMany, useOne, useShow } from "@pankod/refine-core";
import {
    Avatar,
    Badge,
    Box,
    Card,
    DateField,
    Group,
    Show,
    Stack,
    Text,
    Title,
} from "@pankod/refine-mantine";
import { Post, Tag, User } from "../../interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<Post>();
    const post = queryResult?.data?.data;
    const userId = post?.user?.id;
    const tagsId = post?.tags;

    const { data: userData } = useOne<User>({
        resource: "users",
        id: post?.user?.id || "",
        queryOptions: {
            enabled: !!userId,
        },
    });
    const user = userData?.data;

    const { data: tagsData } = useMany<Tag>({
        resource: "tags",
        ids: tagsId || [],
        queryOptions: {
            enabled: !!tagsId?.length,
        },
    });
    const tags = tagsData?.data || [];

    const avatars = user?.avatar;
    const userFullName = `${user?.firstName} ${user?.lastName}`;

    return (
        <>
            <Show breadcrumb={null} canDelete />
            {post && (
                <Card mt={24}>
                    <Stack spacing="xl">
                        <Group>
                            <Avatar.Group spacing="sm">
                                {avatars?.map((avatar) => {
                                    return (
                                        <Avatar
                                            key={avatar?.uid}
                                            src={avatar?.url}
                                            alt={avatar?.name}
                                            size="lg"
                                        />
                                    );
                                })}
                            </Avatar.Group>
                            <Box>
                                <Text>{userFullName}</Text>
                                <DateField value={post?.createdAt} />
                            </Box>
                        </Group>

                        <Box>
                            <Title size="h2" order={2} align="center">
                                {post.title}
                            </Title>
                            <Box px={24}>
                                <Text component="p">{post.content}</Text>
                            </Box>
                        </Box>

                        <Group>
                            {tags.map(({ id, title }) => {
                                return <Badge key={id}>{title}</Badge>;
                            })}
                        </Group>
                    </Stack>
                </Card>
            )}
        </>
    );
};
