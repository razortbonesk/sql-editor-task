import Loader from "../../Loader";
import { useSelector } from "react-redux";
import { IAppState } from "../../../store/reducers";
import { VirtualizedTable } from "./VirtualizedTable";

const QueryResultsViewerComponent = () => {
  const queryResults = useSelector(
    (state: IAppState) => state.queryEngine.queryResults
  );
  const queryErrorMessage = useSelector(
    (state: IAppState) => state.queryEngine.errorMessage
  );
  if (queryErrorMessage) {
    return <div>{queryErrorMessage}</div>;
  }
  if (!queryResults || queryResults.length === 0) {
    return <div>No data to show</div>;
  }
  return <VirtualizedTable queryResults={queryResults.flat()} />;
};

export const QueryResultViewer = ({ isFetchingQuery = false }) => {
  return isFetchingQuery ? <Loader /> : <QueryResultsViewerComponent />;
};
