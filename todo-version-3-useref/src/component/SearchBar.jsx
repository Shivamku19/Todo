import { RiSearchLine, RiCloseLine } from "react-icons/ri";

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar-container my-3">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0 text-muted">
          <RiSearchLine size={18} />
        </span>
        <input
          type="text"
          className="form-control border-start-0 ps-0"
          placeholder="Search tasks by name or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            className="btn btn-outline-secondary border-start-0 bg-white"
            type="button"
            onClick={() => onSearchChange("")}
            title="Clear search"
          >
            <RiCloseLine size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
