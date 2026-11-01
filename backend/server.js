
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load the Workora catalog
const catalog = require("./catalog.json");

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Live Query Filter System API is running!" });
});

// Search and filter API
app.get("/api/resources", (req, res) => {
  try {
    const {
      search = "",
      category = "",
      page = 1,
      limit = 12
    } = req.query;

    const currentPage = Math.max(1, parseInt(page) || 1);
    const pageLimit = Math.min(100, Math.max(1, parseInt(limit) || 12));

    let results = [...catalog];

    // Search by title
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();

      results = results.filter(item =>
        item.title.toLowerCase().includes(keyword)
      );
    }

    // Multi-category filtering
    if (category.trim()) {
      const selectedCategories = category
        .split(",")
        .map(value => value.trim().toLowerCase())
        .filter(Boolean);

      results = results.filter(item =>
        selectedCategories.includes(item.category.toLowerCase())
      );
    }

    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / pageLimit);

    const startIndex = (currentPage - 1) * pageLimit;

    const paginatedResults = results.slice(
      startIndex,
      startIndex + pageLimit
    );

    res.json({
      success: true,
      totalResults,
      totalPages,
      currentPage,
      limit: pageLimit,
      data: paginatedResults
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching resources"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
