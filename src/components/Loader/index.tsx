import { AiOutlineLoading } from "react-icons/ai";
import "./styles.css"; // Import your CSS file for styling

const Loader = () => {
  return (
    <div className="loader">
      <AiOutlineLoading className="spin" size={50} />
    </div>
  );
};

export default Loader;
