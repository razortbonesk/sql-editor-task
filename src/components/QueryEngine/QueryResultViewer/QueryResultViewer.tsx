import React, {  useRef } from "react";
import Table, { ColumnsType } from "rc-table";
import "rc-table/assets/index.css";
import { VariableSizeGrid as Grid } from "react-window";

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const generateData = (count: number): DataItem[] => {
  const data: DataItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      key: i.toString(),
      name: `Name ${i}`,
      age: Math.floor(Math.random() * 100),
      address: `Address ${i}`,
    });
  }
  return data;
};

const columns: ColumnsType<DataItem> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
];
const data = generateData(1000);
const Cell = (props: any) => {
  const { columnIndex, rowIndex, style } = props;
  const dataItem = data[rowIndex];
  const currentDataKey = columns[columnIndex].key + "";
  const filterCurrentDataItem = Object.entries(dataItem).find(
    ([eachKey]) => eachKey === currentDataKey
  );
  const dataValue = filterCurrentDataItem ? filterCurrentDataItem[1] : "NA";
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

const VirtualizedTableWithStickyHeader = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableDimensions, setTableDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const gridRef = React.useRef<any>();
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
  }, []);

  const renderVirtualList: any = (
    rawData: object[],
    { scrollbarSize }: any
  ) => {
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columns.length}
        columnWidth={(index) => {
          const column: any = columns[index];
          const baseColumnTotalWidth = columns.reduce(
            (acc, column: any) => acc + column.width,
            0
          );
          const baseColumnWidth =
            index === columns.length - 1
              ? column.width - scrollbarSize - 1
              : column.width;
          return (
            (baseColumnWidth / baseColumnTotalWidth) * tableDimensions.width
          );
        }}
        height={tableDimensions.height}
        rowCount={rawData.length}
        rowHeight={() => 50}
        width={tableDimensions.width}
      >
        {Cell}
      </Grid>
    );
  };

  return (
    <div ref={tableRef} style={{ width: "100%", height: "100%" }}>
      <Table
        style={{ width: tableDimensions.width, height: tableDimensions.height }}
        tableLayout="fixed"
        columns={columns}
        data={data}
        scroll={{ y: 300 }}
        components={{
          body: renderVirtualList,
        }}
      />
    </div>
  );
};
export const QueryResultViewer = () => {
  return <VirtualizedTableWithStickyHeader />;
};
