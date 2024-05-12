import { AiOutlineEnter } from "react-icons/ai";
import { MdKeyboardControlKey } from "react-icons/md";

import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IAppState } from "../../../../store/reducers";

export const QueryEditorToolBar = ({
  isFetchingQuery = false,
  onRun = () => {},
}) => {
  const queryResults = useSelector(
    (state: IAppState) => state.queryEngine.queryResults
  );
  const totalRecordsFound = queryResults ? queryResults.length : 0;
  return (
    <div className="query-editor-toolbar">
      <button
        className={`button${isFetchingQuery ? " disabled" : ""}`}
        disabled={isFetchingQuery}
        onClick={onRun}
      >
        <FaPlay className="icon" />
        Run{" "}
        <span className="key-board-text">
          &nbsp;
          <MdKeyboardControlKey />
          +
          <AiOutlineEnter className="icon" />
        </span>
      </button>
      {!!(queryResults && queryResults.length !== 0) && (
        <span className="query-status">Records Found: {totalRecordsFound}</span>
      )}
    </div>
  );
};
