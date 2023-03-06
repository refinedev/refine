import { useShow } from "@refinedev/core";

import { IPost } from "interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data } = queryResult;
    const record = data?.data;

    return (
        <div>
            <div>
                <label>Title</label>
                <input value={record?.title} disabled />
            </div>
            <div>
                <label>Content</label>
                <textarea value={record?.content} disabled rows={10} />
            </div>
        </div>
    );
};
