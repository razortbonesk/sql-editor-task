import { QueryEditorToolBar } from "./QueryEditorToolBar";
import "./styles.css";
import { useDebounce } from "../../../hooks/useDebounce";
import { KeyboardEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchQueryResults } from "../../../../store/actions/queryEngineActions";
import { useLastRunQueryEffect } from "./useLastRunQueryEffect";

export const QueryEditor = ({ isFetchingQuery = false }) => {
  const [query, setQuery] = useDebounce("", 100);
  const textareaRef = useLastRunQueryEffect(setQuery);
  const dispatch = useDispatch();

  // Fetch query results
  const fireFetchQueryResults = useCallback(() => {
    if (query.trim() === "") return;
    dispatch(fetchQueryResults(query));
  }, [dispatch, query]);

  // Handle CMD (or Ctrl) + Enter key press
  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      // Check if CMD (or Ctrl) key and Enter key are pressed simultaneously
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior (e.g., form submission)
        fireFetchQueryResults();
      }
    },
    [fireFetchQueryResults]
  );

  return (
    <div style={{ height: "100%" }} onKeyDown={handleKeyDown} tabIndex={0}>
      <QueryEditorToolBar
        isFetchingQuery={isFetchingQuery}
        onRun={fireFetchQueryResults}
      />
      <textarea
        className={`query-text-editor${
          isFetchingQuery ? " query-editor-loading" : ""
        }`}
        disabled={isFetchingQuery}
        placeholder="Enter your query here..."
        ref={textareaRef}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
    </div>
  );
};
