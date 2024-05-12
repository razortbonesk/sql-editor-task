import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
export function ReactTableVirtualized({
  data,
  columns,
}: {
  data: any;
  columns: any;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  return (
    <div ref={parentRef} className="container">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table>
          <thead className="table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted();
                  const sortIcon =
                    sortDirection && sortDirection === "desc" ? (
                      <BsSortAlphaUpAlt className="icon" />
                    ) : sortDirection === "asc" ? (
                      <BsSortAlphaDown className="icon" />
                    ) : null;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="table-header-cell"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                            width: `${header.getSize()}px`,
                          }}
                          style={{
                            width: `${header.getSize()}px`,
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {sortIcon}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualizer
              .getVirtualItems()
              .map((virtualRow: any, index: any) => {
                const row = rows[virtualRow.index];
                return (
                  <tr
                    key={row.id}
                    className="table-data-row"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td className="table-data-row-cell" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
