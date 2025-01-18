import React, { useEffect, useRef } from "react";
import Button from "../../../components/shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import P from "../../../components/shared/Typography/P";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  totalCount: number;
  goToSelPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const VenuePagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  totalCount,
  goToSelPage,
  goToNextPage,
  goToPreviousPage
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(".active-page");
      if (activeButton) {
        const containerBounds = containerRef.current.getBoundingClientRect();
        const buttonBounds = activeButton.getBoundingClientRect();

        // Scroll only if the button is not fully visible
        if (
          buttonBounds.left < containerBounds.left ||
          buttonBounds.right > containerBounds.right
        ) {
          activeButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        }
      }
    }
  }, [currentPage]);

  return (
    <div className="relative mt-6">
      <div className="relative flex items-center justify-center gap-4">
        {/* Previous Button */}
        {currentPage > 1 && (
          <Button
            onClick={goToPreviousPage}
            buttonType="transparent"
            title="Previous Page"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        )}

        {/* Page Buttons */}
        <div
          className="flex w-full max-w-52 items-center gap-2 overflow-x-auto scrollbar-hide overflow-hidden"
          ref={containerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSelPage(index + 1)}
              title={`Go to Page ` + (index + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                currentPage === index + 1
                  ? "bg-color1-600 text-white active-page"
                  : "bg-color2-300 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        {currentPage < pageCount && (
          <Button
            onClick={goToNextPage}
            buttonType="transparent"
            title="Next Page"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>

      {/* Pagination Info */}
      <div className="mt-4 text-center text-gray-600">
        <P>
          Page {currentPage} of {pageCount}
        </P>
        <P>Total venues: {totalCount}</P>
      </div>
    </div>
  );
};

export default VenuePagination;
