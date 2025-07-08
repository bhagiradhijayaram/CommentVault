import "./FilterGroup.css";

const FilterGroup = ({ sortConfig, handleSort }) => {
  return (
    <>
      <div className="filter-by-category-wrapper">
        <section className="sort-section">
          <select
            value={
              sortConfig.key === "postId" ? sortConfig.direction || "" : ""
            }
            onChange={(e) => handleSort("postId", e.target.value)}
          >
            <option value="">Sort Post ID</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </section>

        <section className="sort-section">
          <select
            value={sortConfig.key === "name" ? sortConfig.direction || "" : ""}
            onChange={(e) => handleSort("name", e.target.value)}
          >
            <option value="">Sort Name</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </section>

        <section className="sort-section">
          <select
            value={sortConfig.key === "email" ? sortConfig.direction || "" : ""}
            onChange={(e) => handleSort("email", e.target.value)}
          >
            <option value="">Sort Email</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </section>
      </div>
    </>
  );
};

export default FilterGroup;
