import { useSelector } from "react-redux";
import { IAppState } from "../../../../store/reducers";
import { FaCopy } from "react-icons/fa";

import "./styles.css";
import { useState } from "react";

export const QueryHistory = () => {
  const recentTenQueryLogs = useSelector(
    (state: IAppState) => state.queryEngine.queryHistory
  );
  const [lastCopiedQuery, setLastCopiedQuery] = useState(-1);
  const copyStringToClipBoard = (str: string, index: number) => () => {
    navigator.clipboard.writeText(str);
    setLastCopiedQuery(index);
    setTimeout(() => {
      setLastCopiedQuery(-1);
    }, 1000);
  };
  return (
    <div className="query-history-wrapper">
      <pre>
        {recentTenQueryLogs.length === 0 && "No queries executed yet"}
        {recentTenQueryLogs.map((queryLog, index) => {
          return (
            <div key={index}>
              <span className="query-log-time">
                {queryLog.runAt.toLocaleTimeString()}&nbsp;
                {queryLog.querySuccess
                  ? Math.round(queryLog.timeTaken) + "ms"
                  : ""} &nbsp;
              </span>
              <code>{queryLog.query}</code>&nbsp;
              <FaCopy
                className="icon"
                color={lastCopiedQuery === index ? "green" : "black"}
                onClick={copyStringToClipBoard(queryLog.query, index)}
              />
              {queryLog.querySuccess ? "✅" : "❌"}
            </div>
          );
        })}
      </pre>
    </div>
  );
};
