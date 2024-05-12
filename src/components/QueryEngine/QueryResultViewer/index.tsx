import Loader from "../../Loader";
import { useSelector } from "react-redux";
import { IAppState } from "../../../store/reducers";
import "./styles.css";
import { Suspense, lazy } from "react";
import { ImNotification } from "react-icons/im";

const VirtualizedTable = lazy(() => import("./VirtualizedTable"));

const QueryResultsViewerComponent = () => {
  const queryResults = useSelector(
    (state: IAppState) => state.queryEngine.queryResults
  );
  const queryErrorMessage = useSelector(
    (state: IAppState) => state.queryEngine.errorMessage
  );
  if (queryErrorMessage) {
    return (
      <div className="query-display-info">
        <ImNotification color="var(--brand-primary-color)" />
        &nbsp;
        {queryErrorMessage}
      </div>
    );
  }
  if (!queryResults || queryResults.length === 0) {
    return (
      <div className="query-display-info">
        <ImNotification color="var(--brand-primary-color)" />
        &nbsp; No data to show
      </div>
    );
  }
  return (
    <Suspense fallback={<span />}>
      <VirtualizedTable queryResults={queryResults.flat()} />
    </Suspense>
  );
};

export const QueryResultViewer = ({ isFetchingQuery = false }) => {
  return isFetchingQuery ? <Loader /> : <QueryResultsViewerComponent />;
};
