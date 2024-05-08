import { DiMysql, DiDatabase, DiPostgresql } from "react-icons/di";
import { CiViewTable } from "react-icons/ci";
import { FaDatabase } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

export const TreeNodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "database":
      return (
        <DiDatabase color="var(--brand-primary-color)" className="icon" />
      );
    case "mysql_database":
      return <DiMysql color="var(--brand-primary-color)" className="icon" />;
    case "postgres_database":
      return (
        <DiPostgresql color="var(--brand-primary-color)" className="icon" />
      );
    case "mongo_database":
      return (
        <SiMongodb color="var(--brand-primary-color)" className="icon" />
      );
    case "table":
      return (
        <CiViewTable color="var(--brand-primary-color)" className="icon" />
      );
    case "schema":
      return (
        <FaDatabase color="var(--brand-primary-color)" className="icon" />
      );
    default:
      return null;
  }
};
