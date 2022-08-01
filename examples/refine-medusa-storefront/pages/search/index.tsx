import { LayoutWrapper, useTable } from "@pankod/refine-core";
import Search from "@components/search";
import { useRouter } from "next/router";

const SearchPage: React.FC = () => {
    const router = useRouter();
    const { q } = router.query;
    console.log("q", { q });

    const { tableQueryResult } = useTable({
        resource: "products",
        permanentFilter: [
            {
                field: "q",
                operator: "eq",
                value: q,
            },
        ],
    });

    console.log("tableQueryResult?.data?.data", tableQueryResult?.data?.data);

    return (
        <LayoutWrapper>
            <Search products={tableQueryResult?.data?.data} />
        </LayoutWrapper>
    );
};

export default SearchPage;
