import { FaRunning } from "react-icons/fa";

export const QueryEditorToolBar = ({
  isFetchingQuery = false,
  onRun = () => {},
}) => {
  return (
    <div className="query-editor-toolbar">
      <button className="button" disabled={isFetchingQuery} onClick={onRun}>
        <FaRunning className="icon" />
        Run (Ctrl + Enter)
      </button>
    </div>
  );
};
