import { useShow, useOne } from "@pankod/refine-core";

import { IPost, ICategory } from "interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <div className="container mx-auto">
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                    value={record?.title}
                    disabled
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Status</label>
                <input
                    value={record?.status}
                    disabled
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                    Category
                </label>
                <input
                    value={categoryData?.data.title}
                    disabled
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Status</label>
                <textarea
                    value={record?.content}
                    disabled
                    rows={10}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
        </div>
    );
};
