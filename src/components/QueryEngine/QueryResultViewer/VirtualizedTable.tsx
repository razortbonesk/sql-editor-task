import { ReactTableVirtualized } from "./ReactTableVirtualized";

const VirtualizedTable = ({
  queryResults,
}: {
  queryResults: {
    [key: string]: string;
  }[];
}) => {
  const firstResult = queryResults[0];
  const columns = Object.keys(firstResult)
    .filter(
      (each) =>
        typeof firstResult[each] === "string" ||
        typeof firstResult[each] === "boolean" ||
        typeof firstResult[each] === "number"
    )
    .map((key) => ({
      id: key,
      accessorKey: key,
      cell: (row: any) => row.getValue(),
      title: key,
      sticky: "top",
      dataIndex: key,
      key,
      width: 150,
      size: 300,
    }));
  return <ReactTableVirtualized columns={columns} data={queryResults} />;
};

export default VirtualizedTable;
