import { useList } from "@refinedev/core";
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
              <span className="text-dark font-medium opacity-50">
                {country.id}
              </span>
              <span className="text-dark font-medium opacity-50">
                {country.name}
              </span>
              <span className="text-dark font-medium opacity-50">
                {country.iso2}
              </span>
              <span className="text-dark font-medium opacity-50">
                {country.local_name}
              </span>
              <span className="text-dark font-medium opacity-50">
                {country.continent}
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
