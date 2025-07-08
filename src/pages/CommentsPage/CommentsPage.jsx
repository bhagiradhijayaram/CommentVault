import { useEffect, useMemo, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import { CiSearch } from "react-icons/ci";

import "./CommentsPage.css";

const itemsPerPage = 10;
// get local storage data
const persisted = (() => {
  try {
    return JSON.parse(localStorage.getItem("persistedTableData")) || {};
  } catch {
    return {};
  }
})();

const CommentsPage = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(persisted.currentPage || 1);
  const [searchValue, setSearchValue] = useState(persisted.searchValue || "");
  const [sortConfig, setSortConfig] = useState(
    persisted.sortConfig || { key: null, direction: null }
  );

  // fetching comments data
  const fetchCommentsData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setCommentsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data only once
  useEffect(() => {
    fetchCommentsData();
  }, []);

  // save to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      "persistedTableData",
      JSON.stringify({ searchValue, sortConfig, currentPage })
    );
  }, [searchValue, sortConfig, currentPage]);

  const handleSort = (key, direction) => {
    if (!direction) {
      setSortConfig({ key: null, direction: null });
    } else {
      setSortConfig({ key, direction });
    }
  };

  // filter data by search and sorting
  const sortedData = useMemo(() => {
    let filtered = commentsData;

    if (searchValue.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.body?.toLowerCase() || "").includes(searchValue.toLowerCase())
      );
    }

    if (sortConfig.key && sortConfig.direction) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === "string") {
          return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return filtered;
  }, [commentsData, searchValue, sortConfig]);

  // Pagination logic..
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  var paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <section className="comments-section">
        <section className="filter-wrapper">
          {/* Filter */}
          <FilterGroup sortConfig={sortConfig} handleSort={handleSort} />
          <form>
            <div className="filter-by-search-wrapper">
              <CiSearch size={20} />
              <input
                type="search"
                placeholder="Search name,email,comment"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </form>
        </section>
        {/* comments data grid */}
        <table className="comments-table">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.postId}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td className="comment-body">{comment.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="no-comments-found">
                    The data you are looking for could not be found at the
                    moment
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination-handler">
          {/* Pagination */}
          <Pagination
            updateCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            endItem={endIndex}
            totalItemsCount={commentsData.length}
          />
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
