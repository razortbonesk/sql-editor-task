import { SideNav } from "../SideNav/SideNav";
import styles from "./styles.module.css"
export const MainContainer = () => {
  // create a laoyut with a section on the right and two sections on the left
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftSection}>
        <SideNav/>
      </div>
      <div className={styles.rightSection}></div>
    </div>
  );
};
