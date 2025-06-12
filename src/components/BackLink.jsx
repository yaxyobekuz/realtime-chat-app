import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";

// Icons
import arrowLeftIcon from "../assets/icons/outline/arrow-left.svg";

const BackLink = ({ href, label = "", title = "Ortga" }) => {
  return (
    <Link
      title={title}
      aria-label={title}
      to={href ? href : -1}
      className={`${
        label ? "pl-3.5 pr-6 hover:pr-3.5" : "w-12"
      } flex items-center justify-center gap-3.5 h-12 rounded-full -mr-3.5 group transition-all duration-200 hover:mr-0 hover:bg-neutral-100`}
    >
      <Icon
        size={22}
        alt="Ortga"
        src={arrowLeftIcon}
        className="size-[22px] -ml-3.5 transition-[margin] duration-200 group-hover:ml-0.5"
      />
      {label ? <span children={label} /> : null}
    </Link>
  );
};

export default BackLink;
