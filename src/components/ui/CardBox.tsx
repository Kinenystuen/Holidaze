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
  children: React.ReactNode;
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
    <div className={`col-span-4 xs:col-span-2 md:col-span-1 h-full ${cols}`}>
      <Link
        to={link}
        className={`group block mx-auto rounded-lg p-6 h-full bg-white dark:bg-customBgDark-500 ring-1 ring-slate-900/5 shadow-sm space-y-3 hover:bg-color1-500 hover:ring-color1-600 transition duration-300 ease-in-out ${className}`}
      >
        <div
          className={`flex items-center space-x-3 hover:text-white ${textColor}`}
        >
          <FontAwesomeIcon
            icon={icon}
            className={`w-4 h-4 group-hover:text-whiteFont-500 ${textColor}`}
          />
          <H2
            className={`text-slate-900 text-sm md:text-base font-semibold group-hover:text-white ${textColor}`}
          >
            {title}
          </H2>
        </div>
        <P
          className={`text-gray-700 text-sm group-hover:text-white ${textColor}`}
        >
          {children}
        </P>
      </Link>
    </div>
  );
};

export default CardBox;
