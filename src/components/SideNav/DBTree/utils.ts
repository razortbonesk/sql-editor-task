import { flattenTree } from "react-accessible-treeview";
import { DataSource } from "../../../store/reducers/datasourcesReducer";

const SupportedDataBases = [
  "mysql_database",
  "postgres_database",
  "mongo_database",
];

export const getUpdatedDataTree = (dataSources: DataSource[]) => {
  const supportDataBasesStructure = SupportedDataBases.map((db) => ({
    name: db,
    metadata: {
      type: db,
    },
    children: [],
  }));
  const updatedDataBasesStructure = dataSources.reduce(
    (acc: any, dataSource) => {
      const dbIndex = acc.findIndex((db: any) => db.name === dataSource.dbType);
      if (dbIndex === -1) {
        return acc;
      }
      const db = acc[dbIndex];
      const dbNameIndex = db.children.findIndex(
        (dbName: any) => dbName.name === dataSource.dbName
      );
      if (dbNameIndex === -1) {
        db.children.push({
          name: dataSource.dbName,
          metadata: {
            type: "schema",
          },
          children: [
            {
              name: dataSource.name,
              metadata: {
                type: "table",
              },
              children: [],
            },
          ],
        });
        return acc;
      }
      const dbName = db.children[dbNameIndex];
      dbName.children.push({
        name: dataSource.name,
        metadata: {
          type: "table",
        },
        children: [],
      });
      return acc;
    },
    supportDataBasesStructure
  );
  const updatedDataTree = {
    name: "Data Sources",
    metadata: {
      type: "datasource",
    },
    children: [
      {
        name: "Databases",
        metadata: {
          type: "database",
        },
        children: [...updatedDataBasesStructure],
      },
    ],
  };
  return flattenTree(updatedDataTree);
};
