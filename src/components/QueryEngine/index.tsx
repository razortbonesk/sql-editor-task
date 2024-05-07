import { useSelector } from "react-redux";
import { QueryEditor } from "./QueryEditor";
import { QueryResultViewer } from "./QueryResultViewer";
import styles from "./styles.module.css";
import { IAppState } from "../../store/reducers";

export const QueryEngine = () => {
  const isFetchingQuery = useSelector(
    (state: IAppState) => state.queryEngine.fetchingQueryResults
  );
  return (
    <div className={styles["query-engine"]}>
      <div className="query-editor">
        <QueryEditor isFetchingQuery={isFetchingQuery} />
      </div>
      <div className={styles["query-result-viewer"]}>
        <QueryResultViewer isFetchingQuery={isFetchingQuery} />
      </div>
    </div>
  );
};
