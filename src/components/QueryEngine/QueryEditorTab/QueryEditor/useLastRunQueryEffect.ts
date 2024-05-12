import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../../../store/reducers";

export const useLastRunQueryEffect = (setQuery: (query: string) => void) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastRunQuery = useSelector(
    (state: IAppState) => state.queryEngine.queryToRun
  );
  useEffect(() => {
    setQuery(lastRunQuery);
    if (textareaRef.current) {
      textareaRef.current.value = lastRunQuery;
    }
  }, [setQuery, lastRunQuery]);
  return textareaRef;
};
