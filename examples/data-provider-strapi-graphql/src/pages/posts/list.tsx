import { IResourceComponentsProps, useExport, useOne } from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
    ExportButton,
    ImportButton,
    CreateButton,
    useImport,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";

import { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    useOne({
        resource: "posts",
        id: 1,
        meta: {
            fields: [
                "id",
                "title",
                {
                    category: ["title"],
                },
            ],
        },
    });

    return null;
};
