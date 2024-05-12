import { useSelector } from "react-redux";
import { QueryResultViewer } from "./QueryResultViewer";
import styles from "./styles.module.css";
import { IAppState } from "../../store/reducers";
import { QueryEditorTab } from "./QueryEditorTab";

export const QueryEngine = () => {
  const isFetchingQuery = useSelector(
    (state: IAppState) => state.queryEngine.fetchingQueryResults
  );
  return (
    <div className={styles["query-engine"]}>
      <div className={styles["query-editor"]}>
        <QueryEditorTab isFetchingQuery={isFetchingQuery} />
      </div>
      <div className={styles["query-result-viewer"]}>
        <QueryResultViewer isFetchingQuery={isFetchingQuery} />
      </div>
    </div>
  );
};
