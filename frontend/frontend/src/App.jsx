
import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const CATEGORY_OPTIONS = [
  "Analytics",
  "Development",
  "Security",
  "Design",
];

function App() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Debounced search, category filtering and pagination
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          search,
          category: categories.join(","),
          page: String(page),
          limit: "12",
        });

        const response = await fetch(
          `${API_URL}/resources?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load resources");
        }

        const result = await response.json();

        setResources(result.data);
        setTotalPages(result.totalPages);
        setTotalResults(result.totalResults);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "We couldn't connect to the server. Please check your backend."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, categories, page]);

  const toggleCategory = (category) => {
    setCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );

    setPage(1);
  };

  const removeCategory = (category) => {
    setCategories((previous) =>
      previous.filter((item) => item !== category)
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategories([]);
    setPage(1);
    setShowMobileFilters(false);
  };

  const hasActiveFilters = search.trim() || categories.length > 0;

  const getCategoryClass = (category) => {
    return `category-tag ${category.toLowerCase()}`;
  };

  return (
    <div className="app">

      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-inner">
          <a className="brand" href="/">
            <span className="brand-icon">Q</span>
            <span>QUORIX<span className="brand-dot">.</span></span>
          </a>

          <div className="nav-center">
            <span className="nav-status-dot"></span>
            SMART RESOURCE DISCOVERY
          </div>

          <div className="nav-right">
            <span className="nav-label">DISCOVER BETTER</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="container">

        <section className="hero">
          <div className="hero-decoration decoration-one"></div>
          <div className="hero-decoration decoration-two"></div>

          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-icon">✦</span>
              YOUR KNOWLEDGE STARTS HERE
            </div>

            <h1>
              Find what matters.
              <br />
              <span>Learn without limits.</span>
            </h1>

            <p className="hero-description">
              Explore a curated collection of learning resources.
              Search smarter, discover faster and find your next
              opportunity to grow.
            </p>

            <div className="search-box">
              <span className="search-icon">⌕</span>

              <input
                type="search"
                placeholder="Search resources by title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

              <div className="search-divider"></div>

              <span className="search-live">
                <span className="live-dot"></span>
                LIVE SEARCH
              </span>
            </div>

            <div className="hero-trust">
              <span>✓</span> Instant discovery
              <span className="trust-separator">•</span>
              <span>✓</span> Smart filters
              <span className="trust-separator">•</span>
              <span>✓</span> Easy exploration
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="stats-row">
          <div className="stat-card">
            <div className="stat-icon purple">▦</div>
            <div>
              <span className="stat-label">TOTAL RESOURCES</span>
              <strong>{totalResults.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">⌕</div>
            <div>
              <span className="stat-label">CURRENT PAGE</span>
              <strong>{page} <small>/ {Math.max(1, totalPages)}</small></strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✦</div>
            <div>
              <span className="stat-label">ACTIVE FILTERS</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
        </section>

        {/* MAIN WORKSPACE */}
        <section className="workspace">

          {/* FILTER SIDEBAR */}
          <aside className={`sidebar ${showMobileFilters ? "mobile-open" : ""}`}>
            <div className="filter-heading">
              <div>
                <span className="section-kicker">REFINE RESULTS</span>
                <h3>Filters</h3>
              </div>

              <button
                className="reset-button"
                onClick={resetFilters}
              >
                Reset all
              </button>
            </div>

            <div className="filter-divider"></div>

            <div className="filter-group">
              <div className="filter-title">
                <h4>Categories</h4>
                <span>{categories.length} selected</span>
              </div>

              <div className="category-list">
                {CATEGORY_OPTIONS.map((category) => (
                  <label className="check-row" key={category}>
                    <input
                      type="checkbox"
                      checked={categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />

                    <span className="custom-checkbox"></span>
                    <span className="check-label">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-info">
              <div className="info-icon">✦</div>
              <div>
                <strong>Discover more</strong>
                <p>
                  Combine categories to find resources
                  that match your interests.
                </p>
              </div>
            </div>

            <button
              className="mobile-done"
              onClick={() => setShowMobileFilters(false)}
            >
              Show results
            </button>
          </aside>

          {/* RESULTS SECTION */}
          <section className="results">

            <div className="results-heading">
              <div>
                <span className="section-kicker">EXPLORE THE COLLECTION</span>
                <h2>Discover resources<span>.</span></h2>
                <p>
                  Find the right knowledge for your next big step.
                </p>
              </div>

              <button
                className="mobile-filter-button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <span>☷</span> Filters
                {categories.length > 0 && (
                  <span className="filter-count">{categories.length}</span>
                )}
              </button>

              <div className="results-live">
                <span className="live-dot"></span>
                LIVE RESULTS
              </div>
            </div>

            {/* ACTIVE FILTER CHIPS */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span className="active-label">Active:</span>

                {search.trim() && (
                  <button
                    className="filter-chip"
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                  >
                    Search: {search}
                    <span>×</span>
                  </button>
                )}

                {categories.map((category) => (
                  <button
                    className="filter-chip"
                    key={category}
                    onClick={() => removeCategory(category)}
                  >
                    {category}
                    <span>×</span>
                  </button>
                ))}

                <button
                  className="clear-filters"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* LOADING STATE */}
            {loading && (
              <div className="resource-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="skeleton-card" key={index}>
                    <div className="skeleton skeleton-small"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-footer"></div>
                  </div>
                ))}
              </div>
            )}

            {/* ERROR STATE */}
            {!loading && error && (
              <div className="empty-state error-state">
                <div className="empty-icon">!</div>
                <h3>Something went wrong</h3>
                <p>{error}</p>
                <button
                  className="primary-button"
                  onClick={() => setPage((current) => current)}
                >
                  Retry
                </button>
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && resources.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>
                <h3>No resources found</h3>
                <p>
                  We couldn't find anything matching your search.
                  Try another keyword or clear your filters.
                </p>
                <button
                  className="primary-button"
                  onClick={resetFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* RESOURCE GRID */}
            {!loading && !error && resources.length > 0 && (
              <div className="resource-grid">
                {resources.map((item) => (
                  <article className="resource-card" key={item.id}>

                    <div className="card-top">
                      <span className={getCategoryClass(item.category)}>
                        {item.category}
                      </span>

                      <span className="rating">
                        <span>★</span> {item.rating}
                      </span>
                    </div>

                    <div className="card-content">
                      <div className="resource-symbol">✧</div>
                      <h3>{item.title}</h3>
                      <p className="card-description">
                        Explore this resource and expand your knowledge.
                      </p>
                    </div>

                    <div className="card-meta">
                      <span>
                        <span className="meta-icon">◈</span>
                        {item.level}
                      </span>

                      <span>
                        <span className="meta-icon">◷</span>
                        {item.durationMinutes} min
                      </span>
                    </div>

                    <div className="card-footer">
                      <span>RESOURCE #{item.id}</span>
                      <span className="card-arrow">↗</span>
                    </div>

                  </article>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {!loading && !error && totalResults > 0 && (
              <div className="pagination">
                <span className="pagination-info">
                  Showing page <strong>{page}</strong> of{" "}
                  <strong>{Math.max(1, totalPages)}</strong>
                </span>

                <div className="pagination-controls">
                  <button
                    className="page-button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    ← <span>Previous</span>
                  </button>

                  <span className="page-number">{page}</span>

                  <button
                    className="page-button next"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <span>Next</span> →
                  </button>
                </div>
              </div>
            )}

          </section>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-icon">Q</span>
            <span>QUORIX<span className="brand-dot">.</span></span>
          </a>

          <p>Discover better. Learn smarter. Grow further.</p>

          <span className="copyright">© 2026 QUORIX</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
