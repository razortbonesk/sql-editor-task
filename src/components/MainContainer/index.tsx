import { useSelector } from "react-redux";
import { QueryEngine } from "../QueryEngine";
import { SideNav } from "../SideNav";
import styles from "./styles.module.css";
import { IAppState } from "../../store/reducers";
import Loader from "../Loader";

export const MainContainer = () => {
  // create a laoyut with a section on the right and two sections on the left
  const isAppLoading = useSelector(
    (state: IAppState) => state.appLoader.loading
  );
  return !isAppLoading ? (
    <div className={styles.mainContainer}>
      <div className={styles.leftSection}>
        <SideNav />
      </div>
      <div className={styles.rightSection}>
        <QueryEngine />
      </div>
    </div>
  ) : (
    <div className={styles.loaderWrapper}>
      <Loader />
    </div>
  );
};
