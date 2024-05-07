import { DiMysql, DiDatabase, DiPostgresql } from "react-icons/di";
import { CiViewTable } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./styles.css";
import * as dataSources from "../../../store/mockdb/datasources.json";

const data = flattenTree(dataSources);

function DirectoryTreeView() {
  return (
    <div className="directory">
      <TreeView
        data={data}
        aria-label="directory tree"
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          level,
        }) => {
          const nodeProps = getNodeProps();
          return (
            <div {...nodeProps} style={{ paddingLeft: 10 * (level - 1) }}>
              <span>
                {isBranch &&
                  (!isExpanded ? (
                    <FaPlus color="e8a87c" className="icon" size={10} />
                  ) : (
                    <FaMinus color="e8a87c" className="icon" size={10} />
                  ))}
              </span>
              <NodeIcon type={element.metadata?.type + "" || ""} />
              {element.name}
            </div>
          );
        }}
      />
    </div>
  );
}

const NodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "database":
      return <DiDatabase color="yellow" className="icon" />;
    case "mysql_database":
      return <DiMysql color="yellow" className="icon" />;
    case "psql_database":
      return <DiPostgresql color="yellow" className="icon" />;
    case "table":
      return <CiViewTable color="yellow" className="icon" />;
    case "schema":
      return <FaDatabase color="yellow" className="icon" />;
    default:
      return null;
  }
};

export default DirectoryTreeView;
