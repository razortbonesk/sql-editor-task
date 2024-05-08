import { FaPlus, FaMinus } from "react-icons/fa";
import TreeView from "react-accessible-treeview";
import "./styles.css";
import { useSelector } from "react-redux";
import { IAppState } from "../../../store/reducers";
import { useMemo } from "react";
import { getUpdatedDataTree } from "./utils";
import { TreeNodeIcon } from "./TreeNodeIcon";

function DirectoryTreeView() {
  const dataSources = useSelector(
    (state: IAppState) => state.dataSources.dataSources
  );
  const flattenDataTree = useMemo(
    () => getUpdatedDataTree(dataSources),
    [dataSources]
  );
  return (
    <div className="directory">
      <TreeView
        data={flattenDataTree}
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
            <div {...nodeProps} style={{ paddingLeft: 5 * (level - 1) }}>
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
