import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BreadcrumbProps } from "../library/types";

import Dropdown from "./Dropdown";
import Button from "../shared/Button/Button";
import GoBackBtn from "./GoBackBtn";

/**
 * Component to display a breadcrumb navigation bar with links and/or dropdowns
 * @param items Array of objects with label, href, current, isDropdown and dropdownItems
 * @param goBack Boolean to display a go back button
 * @param className Additional classes
 * @example
 * ```tsx
 * <Breadcrumb
 *  items={[
 *   { label: "Home", href: "/" },
 *   { label: "Product", current: true }
 *   {
 *      label: "Site",
 *      isDropdown: true,
 *      dropdownItems: [
 *        { label: "Site", href: "/path/path" },
 *        { label: "Site", href: "/path/path" }
 *      ]
 *    }
 *  ]}
 * goBack={true}
 * className="container max-w-8xl mx-auto px-4"
 * />
 * ```
 * @returns JSX.Element
 */

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  goBack,
  className
}) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`mb-2 px-1 py-1 pt-0 gap-4 flex items-center ${className}`}>
      {goBack && (
        <div className="flex items-center">
          <GoBackBtn />
          <span className="sr-only">Go back</span>
        </div>
      )}
      <nav className="flex items-center" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="flex items-center">
                {item.isDropdown && item.dropdownItems ? (
                  <Dropdown
                    label={item.label}
                    items={item.dropdownItems.map((dropdownItem) => ({
                      ...dropdownItem,
                      onClick: () => handleNavigate(dropdownItem.href!)
                    }))}
                  />
                ) : item.href && !item.current ? (
                  <Button
                    onClick={() => handleNavigate(item.href!)}
                    buttonType="transparent"
                    className="flex items-center text-sm p-1"
                  >
                    {index === 0 && (
                      <FontAwesomeIcon
                        icon={faHome}
                        className="w-4 h-4 mr-1"
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </Button>
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      item.current
                        ? "text-gray-500"
                        : "text-gray-700 hover:text-customGreen-800 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {index < items.length - 1 && (
                <li className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
