import { DiMysql, DiDatabase, DiPostgresql } from "react-icons/di";
import { CiViewTable } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

export const TreeNodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "database":
      return <DiDatabase color="yellow" className="icon" />;
    case "mysql_database":
      return <DiMysql color="yellow" className="icon" />;
    case "postgres_database":
      return <DiPostgresql color="yellow" className="icon" />;
    case "mongo_database":
      return <SiMongodb color="yellow" className="icon" />;
    case "table":
      return <CiViewTable color="yellow" className="icon" />;
    case "schema":
      return <FaDatabase color="yellow" className="icon" />;
    default:
      return null;
  }
};
