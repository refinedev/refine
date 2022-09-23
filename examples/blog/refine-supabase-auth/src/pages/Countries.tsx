import { useList } from "@pankod/refine-core";
import { Table } from "react-daisyui";

const columns = ["ID", "Name", "ISO Code", "Local Name", "Continent"];

export const Countries = () => {
    const { data: countries } = useList({
        resource: "countries",
        config: { hasPagination: false },
    });
    return (
        <div className="overflow-x-auto">
            <Table color="primary" className="w-full">
                <Table.Head className="bg-primary">
                    {columns.map((column) => (
                        <span key={column}>{column}</span>
                    ))}
                </Table.Head>
                <Table.Body>
                    {countries?.data.map((country: Record<string, string>) => (
                        <Table.Row key={country.id}>
                            <span className="text-dark opacity-50 font-medium">
                                {country.id}
                            </span>
                            <span className="text-dark opacity-50 font-medium">
                                {country.name}
                            </span>
                            <span className="text-dark opacity-50 font-medium">
                                {country.iso2}
                            </span>
                            <span className="text-dark opacity-50 font-medium">
                                {country.local_name}
                            </span>
                            <span className="text-dark opacity-50 font-medium">
                                {country.continent}
                            </span>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
