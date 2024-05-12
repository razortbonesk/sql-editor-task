import { useState } from "react";
import { QueryEditor } from "./QueryEditor";
import styles from "./styles.module.css";
import { QueryHistory } from "./QueryHistory";

export const QueryEditorTab = ({ isFetchingQuery = false }) => {
  const [currentTab, setCurrentTab] = useState("Query");
  return (
    <div className={styles.queryEditorTabWrapper}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab}${
            currentTab === "Query" ? ` ${styles["active-tab"]}` : ""
          }`}
          onClick={() => setCurrentTab("Query")}
        >
          Query
        </div>
        <div
          className={`${styles.tab}${
            currentTab === "History" ? ` ${styles["active-tab"]}` : ""
          }`}
          onClick={() => setCurrentTab("History")}
        >
          History
        </div>
      </div>
      <div className={styles.tabContent}>
        <div
          style={{
            visibility: `${currentTab === "Query" ? "visible" : "hidden"}`,
            height: `${currentTab === "Query" ? "100%" : "0"}`,
          }}
        >
          <QueryEditor isFetchingQuery={isFetchingQuery} />
        </div>
        <div
          style={{
            visibility: `${currentTab === "History" ? "visible" : "hidden"}`,
            height: `${currentTab === "History" ? "100%" : "0"}`,
          }}
        >
          <QueryHistory />
        </div>
      </div>
    </div>
  );
};
