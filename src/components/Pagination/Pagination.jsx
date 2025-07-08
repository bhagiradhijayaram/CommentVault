import "./Pagination.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({
  updateCurrentPage,
  currentPage,
  totalPages,
  itemsPerPage,
  endItem,
  totalItemsCount,
}) => {
  return (
    // Pagination handlers
    <section className="pagination-wrapper">
      <p>
        {currentPage} - {endItem} of {totalItemsCount} items
      </p>
      <div className="pagination-buttons">
        {/* Left Button */}
        <button
          onClick={() => updateCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="left-button"
        >
          <MdKeyboardArrowLeft size={20} className="icon" />
        </button>
        {[...Array(totalPages)].slice(0, 2).map((_, index) => {
          const page = index + 1;
          return (
            <button
              onClick={() => updateCurrentPage(page)}
              key={index}
              className={currentPage === page ? "active-page" : ""}
            >
              {page}
            </button>
          );
        })}
        {/* Right Button */}
        <button
          onClick={() =>
            updateCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="right-button"
        >
          <MdKeyboardArrowRight size={20} className="icon" />
        </button>
      </div>
      <select
        value={itemsPerPage}
        onChange={(e) => updateCurrentPage(Number(e.target.value))}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} / page
          </option>
        ))}
      </select>
    </section>
  );
};

export default Pagination;
