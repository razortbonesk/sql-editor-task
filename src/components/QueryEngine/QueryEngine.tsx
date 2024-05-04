import { QueryEditor } from "./QueryEditor/QueryEditor";
import { QueryResultViewer } from "./QueryResultViewer/QueryResultViewer";

export const QueryEngine = () => {
  return (
    <div className="query-engine">
      <div className="query-editor">
        <QueryEditor />
      </div>
      <div className="query-result-viewer">
        <QueryResultViewer />
      </div>
    </div>
  );
};
