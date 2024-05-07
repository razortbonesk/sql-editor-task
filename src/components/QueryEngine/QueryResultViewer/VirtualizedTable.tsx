import React, { useRef } from "react";
import Table, { ColumnsType } from "rc-table";
import "rc-table/assets/index.css";
import { VariableSizeGrid as Grid } from "react-window";

const VirtualizedTableWithStickyHeader = ({
  columns,
  data,
}: {
  columns: ColumnsType<any>;
  data: any[];
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableDimensions, setTableDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const gridRef = React.useRef<any>();
  const [connectObject] = React.useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });
  const resizeObserver = React.useRef<any>(
    new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (
          tableRef.current &&
          (tableRef.current.offsetWidth !== width ||
            tableRef.current.offsetHeight !== height)
        ) {
          setTableDimensions({ width, height });
        }
      }
    })
  );
  React.useEffect(() => {
    if (tableRef.current) {
      setTableDimensions({
        width: tableRef.current.offsetWidth,
        height: tableRef.current.offsetHeight,
      });
    }
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
    resizeObserver.current.observe(tableRef.current);
  }, []);

  const renderVirtualList: any = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any
  ) => {
    const Cell = (props: any) => {
      const { columnIndex, rowIndex, style } = props;
      const dataItem = data[rowIndex];
      const currentDataKey = columns[columnIndex].key + "";
      const filterCurrentDataItem = Object.entries(dataItem).find(
        ([eachKey]) => eachKey === currentDataKey
      );
      const dataValue: any = filterCurrentDataItem
        ? filterCurrentDataItem[1]
        : "NA";
      return (
        <div
          className="virtual-cell"
          style={{
            ...style,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dataValue}
        </div>
      );
    };
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columns.length}
        columnWidth={(index) => {
          const column: any = columns[index];
          return index === columns.length - 1
            ? column.width - scrollbarSize - 1
            : column.width;
        }}
        style={{
          overflow: "auto",
        }}
        height={tableDimensions.height - 10}
        rowCount={rawData.length}
        rowHeight={() => 50}
        width={tableDimensions.width}
        onScroll={({ scrollLeft, scrollTop }) => {
          onScroll({ scrollLeft, scrollTop });
        }}
      >
        {Cell}
      </Grid>
    );
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    gridRef.current.scrollTo({ scrollLeft });
  };
  return (
    <div
      ref={tableRef}
      style={{ width: "100%", height: "100%", maxHeight: "70vh" }}
      onScroll={handleScroll}
    >
      <Table
        style={{ width: tableDimensions.width, height: tableDimensions.height }}
        tableLayout="fixed"
        columns={columns}
        data={data}
        scroll={{ y: tableDimensions.height, x: tableDimensions.width }}
        components={{
          body: renderVirtualList,
        }}
      />
    </div>
  );
};

export const VirtualizedTable = ({
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
      title: key,
      dataIndex: key,
      key,
      width: 150,
    }));
  return (
    <VirtualizedTableWithStickyHeader columns={columns} data={queryResults} />
  );
};
