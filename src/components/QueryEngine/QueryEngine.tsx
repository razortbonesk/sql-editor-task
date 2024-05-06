import { QueryEditor } from "./QueryEditor/QueryEditor";
import { QueryResultViewer } from "./QueryResultViewer/QueryResultViewer";
import styles from "./styles.module.css";
export const QueryEngine = () => {
  return (
    <div className={styles["query-engine"]}>
      <div className="query-editor">
        <QueryEditor />
      </div>
      <div className={styles["query-result-viewer"]}>
        <QueryResultViewer />
      </div>
    </div>
  );
};
