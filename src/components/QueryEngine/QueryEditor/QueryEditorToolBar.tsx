import { AiOutlineEnter } from "react-icons/ai";
import { MdKeyboardControlKey } from "react-icons/md";

import { FaPlay } from "react-icons/fa";

export const QueryEditorToolBar = ({
  isFetchingQuery = false,
  onRun = () => {},
}) => {
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
    </div>
  );
};
