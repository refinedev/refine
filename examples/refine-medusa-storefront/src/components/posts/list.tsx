import {
    IResourceComponentsProps,
    GetListResponse,
    useTranslate,
    useList,
    useNavigation,
} from "@pankod/refine-core";
import {
    List,
    Table,
    TextField,
    useTable,
    getDefaultSortOrder,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    useSelect,
    TagField,
    FilterDropdown,
    Select,
    ShowButton,
    Button,
    SaveButton,
    useEditableTable,
} from "@pankod/refine-antd";
import { IPost, ICategory } from "src/interfaces";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = ({ initialData }) => {
    const t = useTranslate();

    const { show } = useNavigation();

    const result = useList({
        resource: "products",
    });

    return (
        <ul>
            {result?.data?.data?.map((product) => (
                <li
                    onClick={() => show("products", `${product.id}`)}
                    key={product.id}
                >
                    {product.title}
                </li>
            ))}
        </ul>
    );
};
