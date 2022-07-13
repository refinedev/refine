import { useOne, useShow } from "@pankod/refine-core";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow();
    const { data } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne({
        resource: "products",
        id: record?.id || "",
    });

    return <div>{categoryData?.data?.description}</div>;
};
