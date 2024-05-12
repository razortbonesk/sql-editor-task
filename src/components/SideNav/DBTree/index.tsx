import { FaPlus, FaMinus } from "react-icons/fa";
import TreeView from "react-accessible-treeview";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../../store/reducers";
import { useCallback, useMemo } from "react";
import { getUpdatedDataTree } from "./utils";
import { TreeNodeIcon } from "./TreeNodeIcon";
import { fetchQueryResults } from "../../../store/actions/queryEngineActions";

function DirectoryTreeView() {
  const dataSources = useSelector(
    (state: IAppState) => state.dataSources.dataSources
  );
  const flattenDataTree = useMemo(
    () => getUpdatedDataTree(dataSources),
    [dataSources]
  );
  const dispatch = useDispatch();
  const runSelectQuery = useCallback(
    (tableName: string) => {
      const query = `select * from ${tableName.toLowerCase()}`;
      dispatch(fetchQueryResults(query));
    },
    [dispatch]
  );
  return (
    <div className="directory">
      <TreeView
        data={flattenDataTree}
        aria-label="directory tree"
        nodeRenderer={(props) => {
          const { element, isBranch, isExpanded, getNodeProps, level } = props;
          const nodeProps = getNodeProps();
          const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
            nodeProps.onClick(e);
            if (element.metadata?.type === "table") {
              runSelectQuery(element.name);
            }
          };
          return (
            <div
              {...nodeProps}
              onDoubleClick={onClick}
              style={{ paddingLeft: 5 * (level - 1) }}
            >
              <span>
                {isBranch &&
                  (!isExpanded ? (
                    <FaPlus color="black" className="icon" size={10} />
                  ) : (
                    <FaMinus color="black" className="icon" size={10} />
                  ))}
              </span>
              <TreeNodeIcon type={element.metadata?.type + "" || ""} />
              {element.name}
            </div>
          );
        }}
      />
    </div>
  );
}

export default DirectoryTreeView;
