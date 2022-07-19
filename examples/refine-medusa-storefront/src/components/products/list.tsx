import {
    IResourceComponentsProps,
    GetListResponse,
    useTranslate,
    useList,
    useNavigation,
} from "@pankod/refine-core";
import { IPost, ICategory } from "src/interfaces";

export const ProductList: React.FC<
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
