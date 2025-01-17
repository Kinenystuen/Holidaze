import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import H2 from "../shared/Typography/H2";
import P from "../shared/Typography/P";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardProps {
  icon: IconProp;
  link: string;
  cols?: string;
  className?: string;
  textColor?: string;
  title: string;
  children: string;
}

const CardBox: React.FC<CardProps> = ({
  icon,
  link,
  cols,
  className,
  textColor,
  title,
  children
}) => {
  return (
    <div className={`col-span-3 sm:col-span-1 ${cols}`}>
      <Link
        to={link}
        className={`group block mx-auto rounded-lg p-6 bg-white dark:bg-customBgDark-500 ring-1 ring-slate-900/5 shadow-sm space-y-3 hover:text-white hover:bg-color1-500 hover:ring-color1-600 ${className}`}
      >
        <div
          className={`flex items-center space-x-3 hover:text-white ${textColor}`}
        >
          <FontAwesomeIcon icon={icon} className={`w-4 h-4 ${textColor}`} />
          <H2
            className={`text-slate-900 text-sm md:text-base font-semibold group-hover:text-white ${textColor}`}
          >
            {title}
          </H2>
        </div>
        <P
          className={`text-slate-500 text-sm group-hover:text-white ${textColor}`}
        >
          {children}
        </P>
      </Link>
    </div>
  );
};

export default CardBox;
